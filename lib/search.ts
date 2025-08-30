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
      item.fullName,
      item.description,
      item.type,
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
  
  return results.map((index: number) => {
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

  // Full name match
  if (item.fullName.toLowerCase().includes(queryLower)) score += 30

  // Description match
  if (item.description.toLowerCase().includes(queryLower)) score += 20

  // Type match
  if (item.type.toLowerCase().includes(queryLower)) score += 15

  // Parameter matches
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
  if (item.fullName.toLowerCase().includes(queryLower)) matchedFields.push('fullName')
  if (item.description.toLowerCase().includes(queryLower)) matchedFields.push('description')
  if (item.type.toLowerCase().includes(queryLower)) matchedFields.push('type')

  return matchedFields
}
