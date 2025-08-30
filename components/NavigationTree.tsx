'use client'

import { useState, useMemo } from 'react'
import { DocItem, NavigationNode } from '@/types/documentation'

interface NavigationTreeProps {
  documentation: DocItem[]
  onSelectItem: (item: DocItem) => void
  selectedItem: DocItem | null
  selectedVersion: string
}

export default function NavigationTree({ documentation, onSelectItem, selectedItem, selectedVersion }: NavigationTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['system']))

  // Filter to show only dependencies (not the Revit version item itself)
  const filteredDependencies = useMemo(() => {
    return documentation.filter(item => {
      // Only show dependency items, not the Revit version parent
      return item.revitVersionId === `revit-${selectedVersion}` && 
             item.parentId && // Has a parent (is a dependency)
             item.type !== 'autodesk' // Not the main Revit version item
    })
  }, [documentation, selectedVersion])

  const toggleExpanded = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'autodesk': return '🏗️'
      case 'third-party': return '📦'
      case 'aws': return '☁️'
      case 'microsoft': return '🪟'
      case 'system': return '⚙️'
      // Legacy support
      case 'namespace': return '📁'
      case 'class': return '🏛️'
      case 'interface': return '🔌'
      case 'method': return '⚙️'
      case 'property': return '🏷️'
      case 'enum': return '📋'
      default: return '📄'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'autodesk': return 'text-blue-600'
      case 'third-party': return 'text-purple-600'
      case 'aws': return 'text-orange-600'
      case 'microsoft': return 'text-green-600'
      case 'system': return 'text-gray-600'
      // Legacy support
      case 'namespace': return 'text-blue-600'
      case 'class': return 'text-green-600'
      case 'interface': return 'text-purple-600'
      case 'method': return 'text-orange-600'
      case 'property': return 'text-red-600'
      case 'enum': return 'text-indigo-600'
      default: return 'text-gray-600'
    }
  }

  const getItemType = (item: DocItem): string => {
    // Check if it's a Revit version (has year property)
    if ('year' in item) {
      return 'autodesk'
    }
    // Otherwise it's a dependency with a type property
    return item.type || 'system'
  }

  const renderNode = (node: NavigationNode, depth: number = 0) => {
    const hasChildren = node.children.length > 0
    const isExpanded = expandedNodes.has(node.item.id)
    const isSelected = selectedItem?.id === node.item.id

    return (
      <div key={node.item.id}>
        <div
          className={`flex items-center px-2 py-1 cursor-pointer rounded-md mx-2 ${
            isSelected 
              ? 'bg-primary-100 text-primary-700 border border-primary-200' 
              : 'hover:bg-gray-100'
          }`}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
          onClick={() => onSelectItem(node.item as DocItem)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleExpanded(node.item.id)
              }}
              className="mr-1 p-1 hover:bg-gray-200 rounded"
            >
              <svg
                className={`w-3 h-3 transition-transform ${
                  isExpanded ? 'transform rotate-90' : ''
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          {!hasChildren && <div className="w-5" />}
          
          <span className="mr-2 text-sm">{getTypeIcon(getItemType(node.item))}</span>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className={`font-medium text-sm truncate ${
                isSelected ? 'text-primary-700' : 'text-gray-900'
              }`}>
                {node.item.name}
              </span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${getTypeColor(getItemType(node.item))} bg-gray-100`}>
                {getItemType(node.item)}
              </span>
              {'version' in node.item && node.item.version && (
                <span className="text-xs text-gray-500">
                  v{node.item.version}
                </span>
              )}
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="py-2">
      {filteredDependencies.map(item => (
        <div
          key={item.id}
          className={`flex items-center px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 ${
            selectedItem?.id === item.id
              ? 'bg-blue-50 border-l-4 border-l-blue-500'
              : 'hover:bg-gray-50'
          }`}
          onClick={() => onSelectItem(item)}
        >
          <span className="mr-3 text-lg">{getTypeIcon(item.type || 'unknown')}</span>
          <span className={`font-medium text-sm ${
            selectedItem?.id === item.id ? 'text-blue-700' : 'text-gray-900'
          }`}>
            {item.name}.dll
          </span>
        </div>
      ))}
    </div>
  )
}
