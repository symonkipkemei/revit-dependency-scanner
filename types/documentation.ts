export interface DocItem {
  id: string
  name: string
  type: 'namespace' | 'class' | 'interface' | 'method' | 'property' | 'enum'
  fullName: string
  description: string
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
