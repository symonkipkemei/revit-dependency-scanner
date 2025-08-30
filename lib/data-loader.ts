import { RevitVersion, RevitDependency, DocItem } from '@/types/documentation'

interface RealAssemblyData {
  FilePath: string
  Name: string
  Version: string
  Culture: string
  PublicKeyToken: string
  ImageRuntimeVersion: string | null
  TargetFramework: string | null
  ReferencedAssemblies: Array<{
    Name: string
    Version: string
    PublicKeyToken: string
  }> | null
  CustomAttributes: Array<{
    TypeName: string
    ConstructorArguments: string[]
  }>
  InstallationLocation: string
}

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
    // Load sample data for other versions first
    const revitVersions = await loadRevitVersions()
    const sampleData = convertToLegacyFormat(revitVersions)
    
    // Load real Revit 2023 assembly data
    const realAssemblyData = await loadRealAssemblyData()
    
    // Filter out sample Revit 2023 data and replace with real data
    const filteredSampleData = sampleData.filter(item => item.revitVersionId !== 'revit-2023')
    
    // Combine real and sample data
    return [...filteredSampleData, ...realAssemblyData]
  } catch (error) {
    console.error('Error loading documentation:', error)
    return []
  }
}

async function loadRealAssemblyData(): Promise<DocItem[]> {
  try {
    const response = await fetch('/RevitAssemblyMetadata2023.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const assemblies: RealAssemblyData[] = await response.json()
    console.log(`Loaded ${assemblies.length} assemblies from real data`)
    
    return convertRealAssemblyData(assemblies)
  } catch (error) {
    console.error('Error loading real assembly data:', error)
    return []
  }
}

function convertRealAssemblyData(assemblies: RealAssemblyData[]): DocItem[] {
  const docItems: DocItem[] = []
  
  // Create Revit 2023 version item
  const revit2023: DocItem = {
    id: 'revit-2023-real',
    name: 'Revit 2023',
    fullName: 'Revit 2023',
    assemblyName: 'Revit 2023',
    version: '2023',
    description: `Revit 2023 with ${assemblies.length} .NET assemblies analyzed`,
    location: 'C:\\Program Files\\Autodesk\\Revit 2023\\',
    type: 'autodesk',
    revitVersionId: 'revit-2023-real'
  }
  docItems.push(revit2023)
  
  console.log(`Processing ${assemblies.length} assemblies...`)
  
  // Filter and convert valid assemblies
  const validAssemblies = assemblies.filter(assembly => 
    assembly.Version && 
    !assembly.CustomAttributes?.some(attr => attr.TypeName === 'Error') &&
    assembly.TargetFramework // Only include .NET assemblies
  )
  
  console.log(`Found ${validAssemblies.length} valid assemblies out of ${assemblies.length} total`)
  
  validAssemblies.forEach((assembly, index) => {
      const fileName = assembly.FilePath.split('\\').pop() || assembly.Name
      const isThirdParty = !assembly.Name.toLowerCase().includes('autodesk') && 
                          !assembly.Name.toLowerCase().includes('revit') &&
                          assembly.PublicKeyToken && 
                          assembly.PublicKeyToken !== ''
      
      const depItem: DocItem = {
        id: `revit-2023-real-${index}`,
        name: assembly.Name,
        fullName: `${assembly.Name} v${assembly.Version}`,
        assemblyName: assembly.Name,
        version: assembly.Version,
        description: `${fileName} - ${assembly.TargetFramework || 'Unknown framework'}`,
        location: assembly.FilePath,
        type: isThirdParty ? 'third-party' : 'autodesk',
        revitVersionId: 'revit-2023',
        parentId: 'revit-2023-real',
        publicKeyToken: assembly.PublicKeyToken || undefined,
        recommendations: assembly.PublicKeyToken ? 
          [`Use ${assembly.Name} ${assembly.Version} for Revit 2023 compatibility`] : 
          [`${assembly.Name} is unsigned - consider version conflicts`],
        referencedAssemblies: assembly.ReferencedAssemblies?.map(ref => ({
          name: ref.Name,
          version: ref.Version,
          publicKeyToken: ref.PublicKeyToken
        }))
      }
      docItems.push(depItem)
    })
  
  return docItems
}

function getRevitVersionsData(): RevitVersion[] {
  return [
    {
      id: 'revit-2025',
      name: 'Revit 2025',
      description: 'Latest Revit version with enhanced cloud capabilities and improved performance',
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
      description: 'Stable Revit version with improved interoperability and performance enhancements',
      year: '2024',
      releaseDate: '2023-04-12',
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
      description: 'Widely adopted Revit version with solid stability and extensive third-party support',
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
      description: 'Legacy Revit version still in use by many organizations',
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
      description: 'Older Revit version with limited support for modern dependencies',
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
