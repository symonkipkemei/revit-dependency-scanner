'use client'

import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import NavigationTree from '@/components/NavigationTree'
import ContentDisplay from '@/components/ContentDisplay'
import { DocItem, SearchResult } from '@/types/documentation'
import { searchDocumentation } from '@/lib/search'
import { loadDocumentation } from '@/lib/data-loader'

export default function Home() {
  const [documentation, setDocumentation] = useState<DocItem[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedItem, setSelectedItem] = useState<DocItem | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const docs = await loadDocumentation()
        setDocumentation(docs)
        // Set first item as default selection
        if (docs.length > 0) {
          setSelectedItem(docs[0])
        }
      } catch (error) {
        console.error('Failed to load documentation:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = await searchDocumentation(query, documentation)
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading documentation...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-4">API Documentation</h1>
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
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <ContentDisplay item={selectedItem} />
      </div>
    </div>
  )
}
