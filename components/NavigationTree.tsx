'use client'

import { useState, useMemo } from 'react'
import { DocItem, NavigationNode } from '@/types/documentation'

interface NavigationTreeProps {
  documentation: DocItem[]
  onSelectItem: (item: DocItem) => void
  selectedItem: DocItem | null
}

export default function NavigationTree({ documentation, onSelectItem, selectedItem }: NavigationTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['system']))

  const navigationTree = useMemo(() => {
    const nodeMap = new Map<string, NavigationNode>()
    const rootNodes: NavigationNode[] = []

    // Create nodes for all items
    documentation.forEach(item => {
      nodeMap.set(item.id, {
        item,
        children: [],
        expanded: expandedNodes.has(item.id)
      })
    })

    // Build the tree structure
    documentation.forEach(item => {
      const node = nodeMap.get(item.id)!
      
      if (item.parentId) {
        const parent = nodeMap.get(item.parentId)
        if (parent) {
          parent.children.push(node)
        }
      } else {
        rootNodes.push(node)
      }
    })

    return rootNodes
  }, [documentation, expandedNodes])

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
      case 'namespace': return 'text-blue-600'
      case 'class': return 'text-green-600'
      case 'interface': return 'text-purple-600'
      case 'method': return 'text-orange-600'
      case 'property': return 'text-red-600'
      case 'enum': return 'text-indigo-600'
      default: return 'text-gray-600'
    }
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
          onClick={() => onSelectItem(node.item)}
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
          
          <span className="mr-2 text-sm">{getTypeIcon(node.item.type)}</span>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className={`font-medium text-sm truncate ${
                isSelected ? 'text-primary-700' : 'text-gray-900'
              }`}>
                {node.item.name}
              </span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${getTypeColor(node.item.type)} bg-gray-100`}>
                {node.item.type}
              </span>
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
      {navigationTree.map(node => renderNode(node))}
    </div>
  )
}
