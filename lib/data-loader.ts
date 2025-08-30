import { RevitVersion, RevitDependency, DocItem } from '@/types/documentation'

export async function loadRevitVersions(): Promise<RevitVersion[]> {
  try {
    // In a real app, this would load from JSON files or scan Revit installations
    return getRevitVersionsData()
  } catch (error) {
    console.error('Error loading Revit versions:', error)
    return []
  }
}

export async function loadDocumentation(): Promise<DocItem[]> {
  try {
    const revitVersions = await loadRevitVersions()
    return convertToLegacyFormat(revitVersions)
  } catch (error) {
    console.error('Error loading documentation:', error)
    return []
  }
}

function getRevitVersionsData(): RevitVersion[] {
  return [
    {
      id: 'revit-2025',
      name: 'Revit 2025',
      year: '2025',
      releaseDate: '2024-04-11',
      children: ['revit-2025-newtonsoft', 'revit-2025-aws', 'revit-2025-system'],
      dependencies: [
        {
          id: 'revit-2025-newtonsoft',
          name: 'Newtonsoft.Json',
          assemblyName: 'Newtonsoft.Json',
          version: '13.0.3.27908',
          nugetPackage: 'Newtonsoft.Json',
          nugetVersion: '13.0.3',
          publicKeyToken: '30ad4fe6b2a6aeed',
          description: 'Popular high-performance JSON framework for .NET',
          location: 'C:\\Program Files\\Autodesk\\Revit 2025\\',
          type: 'third-party',
          revitVersionId: 'revit-2025',
          recommendations: ['Use Newtonsoft.Json 13.0.3 or lower for compatibility'],
          conflicts: [
            {
              conflictsWith: 'System.Text.Json',
              reason: 'Conflicting JSON serialization approaches',
              severity: 'warning',
              solution: 'Choose one JSON library and stick with it'
            }
          ]
        },
        {
          id: 'revit-2025-aws',
          name: 'AWSSDK.Core',
          assemblyName: 'AWSSDK.Core',
          version: '3.7.300.0',
          nugetPackage: 'AWSSDK.Core',
          nugetVersion: '3.7.300',
          publicKeyToken: '885c28607f98e604',
          description: 'AWS SDK for .NET Core runtime support',
          location: 'C:\\Program Files\\Autodesk\\Revit 2025\\AddIns\\',
          type: 'aws',
          revitVersionId: 'revit-2025',
          recommendations: ['Use AWSSDK.Core 3.7.300 or compatible versions'],
          conflicts: [
            {
              conflictsWith: 'AWSSDK.Core > 3.7.300',
              reason: 'Newer versions may have breaking changes',
              severity: 'error',
              solution: 'Downgrade to AWSSDK.Core 3.7.300 or lower'
            }
          ]
        },
        {
          id: 'revit-2025-system',
          name: 'System.Text.Json',
          assemblyName: 'System.Text.Json',
          version: '8.0.0.0',
          nugetPackage: 'System.Text.Json',
          nugetVersion: '8.0.0',
          description: 'High-performance JSON serializer for .NET',
          location: 'C:\\Program Files\\Autodesk\\Revit 2025\\',
          type: 'microsoft',
          revitVersionId: 'revit-2025',
          recommendations: ['Preferred JSON library for new projects']
        }
      ]
    },
    {
      id: 'revit-2024',
      name: 'Revit 2024',
      year: '2024',
      releaseDate: '2023-04-13',
      children: ['revit-2024-newtonsoft', 'revit-2024-aws', 'revit-2024-system'],
      dependencies: [
        {
          id: 'revit-2024-newtonsoft',
          name: 'Newtonsoft.Json',
          assemblyName: 'Newtonsoft.Json',
          version: '12.0.3.23909',
          nugetPackage: 'Newtonsoft.Json',
          nugetVersion: '12.0.3',
          publicKeyToken: '30ad4fe6b2a6aeed',
          description: 'Popular high-performance JSON framework for .NET',
          location: 'C:\\Program Files\\Autodesk\\Revit 2024\\',
          type: 'third-party',
          revitVersionId: 'revit-2024',
          recommendations: ['Use Newtonsoft.Json 12.0.3 or lower for compatibility']
        },
        {
          id: 'revit-2024-aws',
          name: 'AWSSDK.Core',
          assemblyName: 'AWSSDK.Core',
          version: '3.7.200.0',
          nugetPackage: 'AWSSDK.Core',
          nugetVersion: '3.7.200',
          publicKeyToken: '885c28607f98e604',
          description: 'AWS SDK for .NET Core runtime support',
          location: 'C:\\Program Files\\Autodesk\\Revit 2024\\AddIns\\',
          type: 'aws',
          revitVersionId: 'revit-2024',
          recommendations: ['Use AWSSDK.Core 3.7.200 or compatible versions']
        },
        {
          id: 'revit-2024-system',
          name: 'System.Text.Json',
          assemblyName: 'System.Text.Json',
          version: '7.0.0.0',
          nugetPackage: 'System.Text.Json',
          nugetVersion: '7.0.0',
          description: 'High-performance JSON serializer for .NET',
          location: 'C:\\Program Files\\Autodesk\\Revit 2024\\',
          type: 'microsoft',
          revitVersionId: 'revit-2024'
        }
      ]
    },
    {
      id: 'revit-2023',
      name: 'Revit 2023',
      year: '2023',
      releaseDate: '2022-04-07',
      children: ['revit-2023-newtonsoft', 'revit-2023-aws'],
      dependencies: [
        {
          id: 'revit-2023-newtonsoft',
          name: 'Newtonsoft.Json',
          assemblyName: 'Newtonsoft.Json',
          version: '11.0.2.21924',
          nugetPackage: 'Newtonsoft.Json',
          nugetVersion: '11.0.2',
          publicKeyToken: '30ad4fe6b2a6aeed',
          description: 'Popular high-performance JSON framework for .NET',
          location: 'C:\\Program Files\\Autodesk\\Revit 2023\\',
          type: 'third-party',
          revitVersionId: 'revit-2023',
          recommendations: ['Use Newtonsoft.Json 11.0.2 or lower for compatibility']
        },
        {
          id: 'revit-2023-aws',
          name: 'AWSSDK.Core',
          assemblyName: 'AWSSDK.Core',
          version: '3.3.0.0',
          nugetPackage: 'AWSSDK.Core',
          nugetVersion: '3.3.0',
          publicKeyToken: '885c28607f98e604',
          description: 'AWS SDK for .NET Core runtime support',
          location: 'C:\\Program Files\\Autodesk\\Revit 2023\\AddIns\\',
          type: 'aws',
          revitVersionId: 'revit-2023',
          recommendations: ['Use AWSSDK.Core 3.3.0 for maximum compatibility']
        }
      ]
    },
    {
      id: 'revit-2022',
      name: 'Revit 2022',
      year: '2022',
      releaseDate: '2021-04-15',
      children: ['revit-2022-newtonsoft', 'revit-2022-aws'],
      dependencies: [
        {
          id: 'revit-2022-newtonsoft',
          name: 'Newtonsoft.Json',
          assemblyName: 'Newtonsoft.Json',
          version: '12.0.3.23909',
          nugetPackage: 'Newtonsoft.Json',
          nugetVersion: '12.0.3',
          publicKeyToken: '30ad4fe6b2a6aeed',
          description: 'Popular high-performance JSON framework for .NET',
          location: 'C:\\Program Files\\Autodesk\\Revit 2022\\',
          type: 'third-party',
          revitVersionId: 'revit-2022'
        },
        {
          id: 'revit-2022-aws',
          name: 'AWSSDK.Core',
          assemblyName: 'AWSSDK.Core',
          version: '3.3.0.0',
          nugetPackage: 'AWSSDK.Core',
          nugetVersion: '3.3.0',
          publicKeyToken: '885c28607f98e604',
          description: 'AWS SDK for .NET Core runtime support',
          location: 'C:\\Program Files\\Autodesk\\Revit 2022\\AddIns\\',
          type: 'aws',
          revitVersionId: 'revit-2022'
        }
      ]
    },
    {
      id: 'revit-2021',
      name: 'Revit 2021',
      year: '2021',
      releaseDate: '2020-04-09',
      children: ['revit-2021-newtonsoft', 'revit-2021-aws'],
      dependencies: [
        {
          id: 'revit-2021-newtonsoft',
          name: 'Newtonsoft.Json',
          assemblyName: 'Newtonsoft.Json',
          version: '11.0.2.21924',
          nugetPackage: 'Newtonsoft.Json',
          nugetVersion: '11.0.2',
          publicKeyToken: '30ad4fe6b2a6aeed',
          description: 'Popular high-performance JSON framework for .NET',
          location: 'C:\\Program Files\\Autodesk\\Revit 2021\\',
          type: 'third-party',
          revitVersionId: 'revit-2021'
        },
        {
          id: 'revit-2021-aws',
          name: 'AWSSDK.Core',
          assemblyName: 'AWSSDK.Core',
          version: '3.3.0.0',
          nugetPackage: 'AWSSDK.Core',
          nugetVersion: '3.3.0',
          publicKeyToken: '885c28607f98e604',
          description: 'AWS SDK for .NET Core runtime support',
          location: 'C:\\Program Files\\Autodesk\\Revit 2021\\AddIns\\',
          type: 'aws',
          revitVersionId: 'revit-2021'
        }
      ]
    }
  ]
}

function convertToLegacyFormat(revitVersions: RevitVersion[]): DocItem[] {
  const docItems: DocItem[] = []
  
  // Add Revit versions as top-level items
  revitVersions.forEach(version => {
    const versionItem: DocItem = {
      id: version.id,
      name: version.name,
      fullName: version.name,
      assemblyName: version.name,
      version: version.year,
      description: `Revit ${version.year} released on ${version.releaseDate}`,
      location: `C:\\Program Files\\Autodesk\\Revit ${version.year}\\`,
      type: 'autodesk',
      revitVersionId: version.id
    }
    docItems.push(versionItem)
    
    // Add dependencies as child items
    version.dependencies.forEach(dep => {
      const depItem: DocItem = {
        ...dep,
        fullName: `${dep.assemblyName} v${dep.version}`,
        parentId: version.id
      }
      docItems.push(depItem)
    })
  })
  
  return docItems
}
