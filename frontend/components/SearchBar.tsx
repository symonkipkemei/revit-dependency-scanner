'use client'

import { useState, useRef, useEffect } from 'react'
import { DocItem, SearchResult } from '@/types/documentation'

interface SearchBarProps {
  onSearch: (query: string) => void
  searchResults: SearchResult[]
  onSelectResult: (item: DocItem) => void
  query: string
}

export default function SearchBar({ onSearch, searchResults, onSelectResult, query }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOpen(searchResults.length > 0)
    setSelectedIndex(-1)
  }, [searchResults])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onSearch(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || searchResults.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSelectResult(searchResults[selectedIndex].item)
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const handleSelectResult = (item: DocItem) => {
    onSelectResult(item)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'namespace': return '📁'
      case 'class': return '🏛️'
      case 'interface': return '🔌'
      case 'method': return '⚙️'
      case 'property': return '🏷️'
      case 'enum': return '📋'
      default: return '📄'
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search dependencies (e.g., Newtonsoft.Json, AWS, Revit 2024)..."
          style={{ fontFamily: 'Quan Light, sans-serif' }}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {isOpen && searchResults.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto"
        >
          {searchResults.map((result, index) => (
            <div
              key={result.item.id}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? 'bg-primary-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelectResult(result.item)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getTypeIcon(result.item.type || 'unknown')}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 truncate text-base" style={{ fontFamily: 'Quan Light, sans-serif' }}>
                      {result.item.name}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {result.item.type || 'unknown'}
                    </span>
                  </div>
                  <div className="text-base text-gray-500 truncate" style={{ fontFamily: 'Quan Light, sans-serif' }}>
                    {result.item.fullName || result.item.assemblyName || result.item.name}
                  </div>
                  {result.item.description && (
                    <div className="text-xs text-gray-400 mt-1 line-clamp-2" style={{ fontFamily: 'Quan Light, sans-serif' }}>
                      {result.item.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
