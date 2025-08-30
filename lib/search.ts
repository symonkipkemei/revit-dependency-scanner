import FlexSearch from 'flexsearch'
import { DocItem, SearchResult } from '@/types/documentation'

let searchIndex: FlexSearch.Index | null = null

export function initializeSearch(documentation: DocItem[]) {
  searchIndex = new FlexSearch.Index({
    tokenize: 'forward',
    cache: true,
    resolution: 9,
  })

  documentation.forEach((item, index) => {
    const searchText = [
      item.name,
      item.fullName || item.name,
      item.description,
      item.type,
      item.assemblyName || '',
      item.version || '',
      item.nugetPackage || '',
      item.nugetVersion || '',
      item.publicKeyToken || '',
      item.location || '',
      ...(item.recommendations || []),
      ...(item.conflicts?.map(c => `${c.conflictsWith} ${c.reason} ${c.solution}`) || []),
      // Legacy support
      ...(item.parameters?.map(p => `${p.name} ${p.type} ${p.description}`) || []),
      item.returnType || '',
      ...(item.examples?.map(e => `${e.title} ${e.description}`) || [])
    ].join(' ')

    searchIndex!.add(index, searchText)
  })
}

export async function searchDocumentation(
  query: string, 
  documentation: DocItem[]
): Promise<SearchResult[]> {
  if (!searchIndex) {
    initializeSearch(documentation)
  }

  if (!query.trim()) {
    return []
  }

  const results = searchIndex!.search(query, { limit: 20 })
  
  return results.map((resultIndex) => {
    const index = typeof resultIndex === 'number' ? resultIndex : parseInt(resultIndex.toString())
    const item = documentation[index]
    const score = calculateRelevanceScore(query, item)
    const matchedFields = getMatchedFields(query, item)
    
    return {
      item,
      score,
      matchedFields
    }
  }).sort((a, b) => b.score - a.score)
}

function calculateRelevanceScore(query: string, item: DocItem): number {
  const queryLower = query.toLowerCase()
  let score = 0

  // Exact name match gets highest score
  if (item.name.toLowerCase() === queryLower) score += 100
  else if (item.name.toLowerCase().includes(queryLower)) score += 50

  // Assembly name match (important for dependencies)
  if (item.assemblyName && item.assemblyName.toLowerCase().includes(queryLower)) score += 80

  // NuGet package match
  if (item.nugetPackage && item.nugetPackage.toLowerCase().includes(queryLower)) score += 70

  // Version match
  if (item.version && item.version.toLowerCase().includes(queryLower)) score += 40

  // Full name match
  if (item.fullName && item.fullName.toLowerCase().includes(queryLower)) score += 30

  // Description match
  if (item.description.toLowerCase().includes(queryLower)) score += 20

  // Type match
  if (item.type && item.type.toLowerCase().includes(queryLower)) score += 15

  // Revit version match
  if (item.revitVersionId && item.revitVersionId.toLowerCase().includes(queryLower)) score += 35

  // Recommendations match
  item.recommendations?.forEach(rec => {
    if (rec.toLowerCase().includes(queryLower)) score += 10
  })

  // Conflicts match
  item.conflicts?.forEach(conflict => {
    if (conflict.conflictsWith.toLowerCase().includes(queryLower)) score += 15
    if (conflict.reason.toLowerCase().includes(queryLower)) score += 8
  })

  // Legacy parameter matches
  item.parameters?.forEach(param => {
    if (param.name.toLowerCase().includes(queryLower)) score += 10
    if (param.type.toLowerCase().includes(queryLower)) score += 5
  })

  return score
}

function getMatchedFields(query: string, item: DocItem): string[] {
  const queryLower = query.toLowerCase()
  const matchedFields: string[] = []

  if (item.name.toLowerCase().includes(queryLower)) matchedFields.push('name')
  if (item.fullName && item.fullName.toLowerCase().includes(queryLower)) matchedFields.push('fullName')
  if (item.description.toLowerCase().includes(queryLower)) matchedFields.push('description')
  if (item.type && item.type.toLowerCase().includes(queryLower)) matchedFields.push('type')

  return matchedFields
}
