'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import NavigationTree from '@/components/NavigationTree'
import ContentDisplay from '@/components/ContentDisplay'
import { DocItem, SearchResult } from '@/types/documentation'
import { searchDocumentation } from '@/lib/search'
import { loadDocumentation } from '@/lib/data-loader'
import { getAssetPath } from '@/lib/asset-path'

export default function SearchPage() {
  const router = useRouter()
  const [documentation, setDocumentation] = useState<DocItem[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedItem, setSelectedItem] = useState<DocItem | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVersion, setSelectedVersion] = useState<string>('2023')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const docs = await loadDocumentation()
        setDocumentation(docs)
        // Only set initial selection if no item is currently selected
        if (!selectedItem) {
          const firstDependency = docs.find(item => 
            item.revitVersionId === `revit-${selectedVersion}` && 
            item.parentId && 
            item.assemblyName && 
            item.assemblyName !== `Revit ${selectedVersion}`
          )
          if (firstDependency) {
            setSelectedItem(firstDependency)
          }
        }
      } catch (error) {
        console.error('Failed to load documentation:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [selectedVersion])

  // Update selected item when version changes - try to maintain same item across versions
  useEffect(() => {
    if (documentation.length > 0 && selectedItem) {
      // Try to find the same assembly in the new version
      const sameItemInNewVersion = documentation.find(item => 
        item.revitVersionId === `revit-${selectedVersion}` && 
        item.assemblyName === selectedItem.assemblyName
      )
      
      if (sameItemInNewVersion) {
        // Found the same item in the new version, keep it selected
        setSelectedItem(sameItemInNewVersion)
      } else {
        // Item doesn't exist in this version, select first dependency
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
    } else if (documentation.length > 0 && !selectedItem) {
      // No item selected, select first dependency
      const firstDependency = documentation.find(item => 
        item.revitVersionId === `revit-${selectedVersion}` && 
        item.parentId && 
        item.assemblyName && 
        item.assemblyName !== `Revit ${selectedVersion}`
      )
      if (firstDependency) {
        setSelectedItem(firstDependency)
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
    setIsSidebarOpen(false)
    // Auto-scroll to the selected item in navigation tree
    setTimeout(() => {
      const element = document.querySelector(`[data-item-id="${item.id}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 shadow-lg animate-pulse">
            <img 
              src={getAssetPath('/icons/ICON-Grey.png')}
              alt="Loading" 
              className="w-8 h-8"
            />
          </div>
          <div className="text-lg text-black font-medium" style={{ fontFamily: 'Quan Light, sans-serif' }}>Loading Revit dependencies...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Bar */}
      <div style={{ backgroundColor: 'rgb(40, 40, 42)' }}>
        {/* Combined Home Icon and Version Tabs */}
        <div className="flex items-center overflow-x-auto" style={{ backgroundColor: 'rgb(40, 40, 42)' }}>
          <div className="flex flex-1 min-w-0">
            <button 
              onClick={handleBackToHome}
              className="hover:opacity-70 transition-opacity px-3 sm:px-6 py-2 text-white flex items-center flex-shrink-0"
              title="Back to Home"
            >
              <img 
                src={getAssetPath('/icons/ICON-Grey.png')}
                alt="Home" 
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </button>
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden hover:opacity-70 transition-opacity px-3 py-2 text-white flex items-center"
              title="Toggle Navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex overflow-x-auto">
              {['2021', '2022', '2023', '2024', '2025', '2026'].map((version) => (
                <button
                  key={version}
                  onClick={() => setSelectedVersion(version)}
                  className={`px-3 sm:px-6 py-2 text-sm sm:text-base font-semibold transition-colors relative whitespace-nowrap ${
                    selectedVersion === version
                      ? 'bg-black border-b-4 border-white'
                      : 'hover:bg-gray-600'
                  }`}
                style={{ 
                  fontFamily: 'Quan Light, sans-serif',
                  color: selectedVersion === version ? 'white' : 'rgb(196, 196, 198)'
                }}
              >
                Revit {version}
              </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`bg-white border-r border-gray-200 flex flex-col overflow-y-auto scrollbar-custom transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen 
            ? 'fixed inset-y-0 left-0 w-80 lg:relative lg:w-80 xl:w-96' 
            : 'hidden lg:flex lg:w-80 xl:w-96'
        }`}>
          <div className="sticky top-0 bg-white z-10 p-4">
            {/* Mobile Close Button */}
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-md"
                title="Close Navigation"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SearchBar 
              onSearch={handleSearch}
              searchResults={searchResults}
              onSelectResult={handleSelectItem}
              query={searchQuery}
            />
          </div>
          <div className="flex-1">
            <NavigationTree 
              documentation={documentation}
              onSelectItem={handleSelectItem}
              selectedItem={selectedItem}
              selectedVersion={selectedVersion}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto scrollbar-custom">
          <ContentDisplay 
            item={selectedItem}
            selectedVersion={selectedVersion}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-200 px-4 py-2 text-center">
        <p className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Quan Light, sans-serif' }}>
          Documentation for the Revit .Net Assemblies | 
          <a href="https://github.com/symonkipkemei/revit-dependency-scanner" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 ml-1">Open source</a>
        </p>
      </div>
    </div>
  )
}
