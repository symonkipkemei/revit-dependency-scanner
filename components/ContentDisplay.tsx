'use client'

import { DocItem } from '@/types/documentation'

interface ContentDisplayProps {
  item: DocItem | null
}

export default function ContentDisplay({ item }: ContentDisplayProps) {
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-xl font-semibold mb-2">Select an item to view documentation</h2>
          <p>Use the navigation tree or search to find what you're looking for.</p>
        </div>
      </div>
    )
  }

  const getTypeIcon = (type?: string) => {
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

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'autodesk': return 'bg-blue-100 text-blue-800'
      case 'third-party': return 'bg-purple-100 text-purple-800'
      case 'aws': return 'bg-orange-100 text-orange-800'
      case 'microsoft': return 'bg-green-100 text-green-800'
      case 'system': return 'bg-gray-100 text-gray-800'
      // Legacy support
      case 'namespace': return 'bg-blue-100 text-blue-800'
      case 'class': return 'bg-green-100 text-green-800'
      case 'interface': return 'bg-purple-100 text-purple-800'
      case 'method': return 'bg-orange-100 text-orange-800'
      case 'property': return 'bg-red-100 text-red-800'
      case 'enum': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const isRevitVersion = (item: DocItem) => {
    return item.year && item.releaseDate
  }

  const isDependency = (item: DocItem) => {
    return item.assemblyName && item.revitVersionId
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-3xl">{getTypeIcon(item.type)}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
              <div className="flex items-center space-x-2 mt-2">
                {item.type && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                )}
                {isRevitVersion(item) && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Revit {item.year}
                  </span>
                )}
                {item.version && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    v{item.version}
                  </span>
                )}
                {item.deprecated && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    Deprecated
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Assembly/Package Info */}
          {isDependency(item) && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Assembly:</span>
                  <code className="ml-2 bg-white px-2 py-1 rounded font-mono">{item.assemblyName}</code>
                </div>
                {item.nugetPackage && (
                  <div>
                    <span className="font-medium text-gray-700">NuGet Package:</span>
                    <code className="ml-2 bg-white px-2 py-1 rounded font-mono">{item.nugetPackage}</code>
                  </div>
                )}
                {item.publicKeyToken && (
                  <div>
                    <span className="font-medium text-gray-700">Public Key Token:</span>
                    <code className="ml-2 bg-white px-2 py-1 rounded font-mono text-xs">{item.publicKeyToken}</code>
                  </div>
                )}
                {item.location && (
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <code className="ml-2 bg-white px-2 py-1 rounded font-mono text-xs">{item.location}</code>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Revit Version Info */}
          {isRevitVersion(item) && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Release Date:</span>
                  <span className="ml-2">{item.releaseDate}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Dependencies:</span>
                  <span className="ml-2">{item.dependencies?.length || 0} packages</span>
                </div>
              </div>
            </div>
          )}
          
          <p className="text-gray-700 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Syntax */}
        {item.syntax && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Syntax</h2>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="font-mono text-sm">{item.syntax}</code>
            </div>
          </div>
        )}

        {/* Parameters */}
        {item.parameters && item.parameters.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Parameters</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {item.parameters.map((param, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                            {param.name}
                          </code>
                          {param.optional && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              optional
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <code className="font-mono text-sm text-blue-600">
                          {param.type}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {param.description}
                        {param.defaultValue && (
                          <div className="mt-1 text-xs text-gray-500">
                            Default: <code className="bg-gray-100 px-1 rounded">{param.defaultValue}</code>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Return Type */}
        {item.returnType && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Returns</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="font-mono text-sm text-blue-600">{item.returnType}</code>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {item.recommendations && item.recommendations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">💡 Recommendations</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <ul className="space-y-2">
                {item.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-green-800">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Conflicts */}
        {item.conflicts && item.conflicts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">⚠️ Known Conflicts</h2>
            <div className="space-y-4">
              {item.conflicts.map((conflict, index) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  conflict.severity === 'error' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="flex items-start space-x-3">
                    <span className={`text-lg ${
                      conflict.severity === 'error' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {conflict.severity === 'error' ? '🚫' : '⚠️'}
                    </span>
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        conflict.severity === 'error' ? 'text-red-900' : 'text-yellow-900'
                      }`}>
                        Conflicts with: {conflict.conflictsWith}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        conflict.severity === 'error' ? 'text-red-700' : 'text-yellow-700'
                      }`}>
                        {conflict.reason}
                      </p>
                      {conflict.solution && (
                        <div className={`mt-2 p-2 rounded text-sm ${
                          conflict.severity === 'error' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          <strong>Solution:</strong> {conflict.solution}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Examples */}
        {item.examples && item.examples.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Examples</h2>
            <div className="space-y-6">
              {item.examples.map((example, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">{example.title}</h3>
                    {example.description && (
                      <p className="text-sm text-gray-600 mt-1">{example.description}</p>
                    )}
                  </div>
                  <div className="bg-gray-900 text-gray-100 p-4 overflow-x-auto">
                    <pre className="font-mono text-sm">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
