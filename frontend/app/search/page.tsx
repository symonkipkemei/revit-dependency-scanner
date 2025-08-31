'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import NavigationTree from '@/components/NavigationTree'
import ContentDisplay from '@/components/ContentDisplay'
import { DocItem, SearchResult } from '@/types/documentation'
import { searchDocumentation } from '@/lib/search'
import { loadDocumentation } from '@/lib/data-loader'

export default function SearchPage() {
  const router = useRouter()
  const [documentation, setDocumentation] = useState<DocItem[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedItem, setSelectedItem] = useState<DocItem | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVersion, setSelectedVersion] = useState<string>('2023')

  useEffect(() => {
    const loadData = async () => {
      try {
        const docs = await loadDocumentation()
        setDocumentation(docs)
        // Set first dependency of selected version as default selection
        const firstDependency = docs.find(item => 
          item.revitVersionId === `revit-${selectedVersion}` && 
          item.parentId && 
          item.assemblyName && 
          item.assemblyName !== `Revit ${selectedVersion}`
        )
        if (firstDependency) {
          setSelectedItem(firstDependency)
        }
      } catch (error) {
        console.error('Failed to load documentation:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [selectedVersion])

  // Update selected item when version changes - select first dependency
  useEffect(() => {
    if (documentation.length > 0) {
      const firstDependency = documentation.find(item => 
        item.revitVersionId === `revit-${selectedVersion}` && 
        item.parentId && 
        item.assemblyName && 
        item.assemblyName !== `Revit ${selectedVersion}`
      )
      if (firstDependency) {
        setSelectedItem(firstDependency)
      } else if (selectedVersion === '2025' || selectedVersion === '2026') {
        // Show coming soon message for Revit 2025/2026
        setSelectedItem(null)
      }
    }
  }, [selectedVersion, documentation])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      // Filter documentation by selected version before searching
      const filteredDocs = documentation.filter(item => {
        return item.revitVersionId === `revit-${selectedVersion}` || 
               item.name.includes(`Revit ${selectedVersion}`) ||
               item.fullName?.includes(`${selectedVersion}`) ||
               item.assemblyName?.includes(`${selectedVersion}`)
      })
      const results = await searchDocumentation(query, filteredDocs)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleSelectItem = (item: DocItem) => {
    setSelectedItem(item)
    setSearchQuery('')
    setSearchResults([])
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 shadow-lg animate-pulse">
            <span className="text-2xl text-white">🏗️</span>
          </div>
          <div className="text-lg text-black font-medium" style={{ fontFamily: 'Quan Light, sans-serif' }}>Loading Revit dependencies...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        {/* Combined Home Icon and Version Tabs */}
        <div className="flex items-center bg-black p-1 rounded-lg">
          <button 
            onClick={handleBackToHome}
            className="text-2xl hover:opacity-70 transition-opacity px-3 py-2 text-white"
            title="Back to Home"
          >
            🏗️
          </button>
          <div className="flex space-x-1 flex-1">
            {['2021', '2022', '2023', '2024', '2025', '2026'].map((version) => (
              <button
                key={version}
                onClick={() => setSelectedVersion(version)}
                className={`px-4 py-2 rounded-md text-base font-semibold transition-colors ${
                  selectedVersion === version
                    ? 'bg-white text-black shadow-sm'
                    : 'text-white hover:text-gray-200 hover:bg-gray-800'
                }`}
                style={{ fontFamily: 'Quan Light, sans-serif' }}
              >
                Revit {version}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <SearchBar 
              onSearch={handleSearch}
              searchResults={searchResults}
              onSelectResult={handleSelectItem}
              query={searchQuery}
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <NavigationTree 
              documentation={documentation}
              onSelectItem={handleSelectItem}
              selectedItem={selectedItem}
              selectedVersion={selectedVersion}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <ContentDisplay item={selectedItem} selectedVersion={selectedVersion} />
        </div>
      </div>
    </div>
  )
}
