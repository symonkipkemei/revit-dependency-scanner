'use client'

import { DocItem } from '@/types/documentation'

interface ContentDisplayProps {
  item: DocItem | null
  selectedVersion?: string
}

export default function ContentDisplay({ item, selectedVersion }: ContentDisplayProps) {
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <div className="text-6xl mb-4"></div>
          <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Revit Assembly Data</h2>
          <p className="text-lg font-medium mb-1" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Coming Soon</p>
          <p className="text-sm" style={{ fontFamily: 'Quan Light, sans-serif' }}>Assembly metadata for Revit {selectedVersion || '2025'} will be available in a future update.</p>
        </div>
      </div>
    )
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

  const getFrameworkVersionColor = (frameworkInfo?: string) => {
    if (!frameworkInfo) return 'bg-gray-100 text-gray-800'
    
    // Extract version number from framework string
    const versionMatch = frameworkInfo.match(/v(\d+\.\d+)/)
    if (!versionMatch) return 'bg-gray-100 text-gray-800'
    
    const version = parseFloat(versionMatch[1])
    
    if (version >= 4.8) return 'bg-emerald-100 text-emerald-800'
    if (version >= 4.7) return 'bg-yellow-100 text-yellow-800'
    if (version >= 4.6) return 'bg-orange-100 text-orange-800'
    if (version >= 4.5) return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-custom">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Quan Bold, sans-serif' }}>
              {item.name} <span className="text-2xl font-light text-gray-500 ml-2" style={{ fontFamily: 'Quan Light, sans-serif' }}>v{item.version || '1.0.0'}</span>
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <div className={`px-4 py-2 rounded-lg text-sm font-medium ${getTypeColor(item.type)}`}>
                {item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : 'Unknown'} dependency
              </div>
              <div className={`px-4 py-2 rounded-lg text-sm font-medium ${getFrameworkVersionColor(item.description?.split(' - ')[1])}`}>
                {item.description?.split(' - ')[1] || '.NET Framework version not available'}
              </div>
            </div>
          </div>
        </div>

        {/* Assembly Full Identity */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Assembly Identity</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Quan Light, sans-serif' }}>Assembly Name</label>
                <div className="bg-white border border-gray-300 rounded px-3 py-2">
                  <code className="font-mono text-sm">
                    {item.assemblyName || item.name}
                  </code>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Quan Light, sans-serif' }}>Version</label>
                <div className="bg-white border border-gray-300 rounded px-3 py-2">
                  <code className="font-mono text-sm">
                    {item.version || 'Not specified'}
                  </code>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Quan Light, sans-serif' }}>Public Key Token</label>
                <div className="bg-white border border-gray-300 rounded px-3 py-2">
                  <code className="font-mono text-sm">
                    {item.publicKeyToken || 'None (unsigned)'}
                  </code>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Quan Light, sans-serif' }}>Culture</label>
                <div className="bg-white border border-gray-300 rounded px-3 py-2">
                  <code className="font-mono text-sm">
                    neutral
                  </code>
                </div>
              </div>
            </div>
            
            {/* Full Assembly Identity */}
            <div className="mt-6 pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Quan Light, sans-serif' }}>Full Assembly Identity</label>
              <code className="block bg-white border border-gray-300 rounded px-3 py-2 font-mono text-sm break-all">
                {item.assemblyName || item.name}, Version={item.version || '0.0.0.0'}, Culture=neutral, PublicKeyToken={item.publicKeyToken || 'null'}
              </code>
            </div>
          </div>
        </div>

        {/* Strong Naming Status */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Strong Naming</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${item.publicKeyToken ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="font-medium" style={{ fontFamily: 'Quan Light, sans-serif' }}>
                {item.publicKeyToken ? 'Strong-named assembly' : 'Unsigned assembly'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2" style={{ fontFamily: 'Quan Light, sans-serif' }}>
              {item.publicKeyToken 
                ? 'This assembly is digitally signed and has a strong name, providing version and tamper protection.'
                : 'This assembly is not strong-named and may be subject to version conflicts.'
              }
            </p>
          </div>
        </div>

        {/* NuGet Package Information */}
        {item.nugetPackage && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>NuGet Package</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Quan Light, sans-serif' }}>Package Name</label>
                  <code className="block bg-white border border-gray-300 rounded px-3 py-2 font-mono text-sm">
                    {item.nugetPackage}
                  </code>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Quan Light, sans-serif' }}>Package Version</label>
                  <code className="block bg-white border border-gray-300 rounded px-3 py-2 font-mono text-sm">
                    {item.nugetVersion || 'Not specified'}
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Referenced Assemblies */}
        {isDependency(item) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Referenced Assemblies</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="space-y-3">
                {item.referencedAssemblies && item.referencedAssemblies.length > 0 ? (
                  item.referencedAssemblies.map((ref, index) => (
                    <div key={index} className="bg-white border border-gray-300 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-900" style={{ fontFamily: 'Quan Bold, sans-serif' }}>{ref.name}</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          v{ref.version}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 font-mono font-normal" style={{ fontFamily: 'Quan Light, sans-serif' }}>
                        PublicKeyToken: {ref.publicKeyToken || 'None'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500" style={{ fontFamily: 'Quan Light, sans-serif' }}>
                    No referenced assemblies found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Installation Location */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Installation Location</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <code className="block bg-white border border-gray-300 rounded px-3 py-2 font-mono text-sm break-all">
              {item.location}
            </code>
          </div>
        </div>

        {/* Version Compatibility & Binding Redirects */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Version Compatibility</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Quan Light, sans-serif' }}>Supported Version Range</label>
                <div className="bg-white border border-gray-300 rounded px-3 py-2">
                  <code className="font-mono text-sm">
                    {item.nugetVersion ? `>= ${item.nugetVersion}` : 'Any version'}
                  </code>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Quan Light, sans-serif' }}>Binding Redirect Suggestion</label>
                <div className="bg-white border border-gray-300 rounded px-3 py-2">
                  <code className="font-mono text-sm text-blue-600">
                    {item.version ? `newVersion="${item.version}"` : 'Not required'}
                  </code>
                </div>
              </div>
            </div>
            {item.nugetPackage && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <h4 className="font-medium text-blue-900 mb-2" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Suggested app.config binding redirect:</h4>
                <code className="block bg-white border border-blue-300 rounded px-3 py-2 font-mono text-xs overflow-x-auto">
{`<runtime>
  <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
    <dependentAssembly>
      <assemblyIdentity name="${item.assemblyName || item.name}" 
                        publicKeyToken="${item.publicKeyToken || 'null'}" 
                        culture="neutral" />
      <bindingRedirect oldVersion="0.0.0.0-${item.version}" newVersion="${item.version}" />
    </dependentAssembly>
  </assemblyBinding>
</runtime>`}
                </code>
              </div>
            )}
          </div>
        </div>

        {/* Syntax */}
        {item.syntax && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Syntax</h2>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="font-mono text-sm">{item.syntax}</code>
            </div>
          </div>
        )}

        {/* Parameters */}
        {item.parameters && item.parameters.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Parameters</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Description</th>
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
                      <td className="px-4 py-3 text-sm text-gray-700" style={{ fontFamily: 'Quan Light, sans-serif' }}>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Returns</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="font-mono text-sm text-blue-600">{item.returnType}</code>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {item.recommendations && item.recommendations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Recommendations</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <ul className="space-y-2">
                {item.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-green-800" style={{ fontFamily: 'Quan Light, sans-serif' }}>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Conflicts */}
        {item.conflicts && item.conflicts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Known Conflicts</h2>
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
                      {conflict.severity === 'error' ? 'ERROR' : 'WARNING'}
                    </span>
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        conflict.severity === 'error' ? 'text-red-900' : 'text-yellow-900'
                      }`} style={{ fontFamily: 'Quan Bold, sans-serif' }}>
                        Conflicts with: {conflict.conflictsWith}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        conflict.severity === 'error' ? 'text-red-700' : 'text-yellow-700'
                      }`} style={{ fontFamily: 'Quan Light, sans-serif' }}>
                        {conflict.reason}
                      </p>
                      {conflict.solution && (
                        <div className={`mt-2 p-2 rounded text-sm ${
                          conflict.severity === 'error' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          <strong style={{ fontFamily: 'Quan Bold, sans-serif' }}>Solution:</strong> <span style={{ fontFamily: 'Quan Light, sans-serif' }}>{conflict.solution}</span>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Examples</h2>
            <div className="space-y-6">
              {item.examples.map((example, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900" style={{ fontFamily: 'Quan Bold, sans-serif' }}>{example.title}</h3>
                    {example.description && (
                      <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Quan Light, sans-serif' }}>{example.description}</p>
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
