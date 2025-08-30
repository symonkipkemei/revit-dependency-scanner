// Base interface for all items
export interface BaseItem {
  id: string
  name: string
  description: string
}

export interface RevitVersion extends BaseItem {
  year: string
  releaseDate: string
  dependencies: RevitDependency[]
  children?: string[]
}

export interface RevitDependency extends BaseItem {
  assemblyName: string
  version: string
  publicKeyToken?: string
  nugetPackage?: string
  nugetVersion?: string
  location: string
  type: 'system' | 'third-party' | 'autodesk' | 'aws' | 'microsoft'
  revitVersionId: string
  conflicts?: DependencyConflict[]
  recommendations?: string[]
}

export interface DependencyConflict {
  conflictsWith: string
  reason: string
  severity: 'warning' | 'error'
  solution?: string
}

export interface SearchResult {
  item: DocItem
  score: number
  matchedFields: string[]
}

export interface NavigationNode {
  item: DocItem
  children: NavigationNode[]
  expanded: boolean
}

// Unified interface for all documentation items
export interface DocItem extends BaseItem {
  // Revit version properties
  year?: string
  releaseDate?: string
  dependencies?: RevitDependency[]
  
  // Dependency properties
  assemblyName?: string
  version?: string
  publicKeyToken?: string
  nugetPackage?: string
  nugetVersion?: string
  location?: string
  type?: 'system' | 'third-party' | 'autodesk' | 'aws' | 'microsoft'
  revitVersionId?: string
  conflicts?: DependencyConflict[]
  recommendations?: string[]
  
  // Legacy properties
  fullName?: string
  syntax?: string
  parameters?: Parameter[]
  returnType?: string
  examples?: CodeExample[]
  parentId?: string
  children?: string[]
  deprecated?: boolean
  since?: string
}

export interface Parameter {
  name: string
  type: string
  description: string
  optional?: boolean
  defaultValue?: string
}

export interface CodeExample {
  title: string
  language: string
  code: string
  description?: string
}
