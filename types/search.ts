export interface SearchResult {
  id: string
  type: "pub" | "location" | "feature"
  title: string
  subtitle?: string
  icon?: string
}

export interface Region {
  name: string
  slug: string
  pubCount: number
  subRegions?: Array<{
    name: string
    slug: string
    pubCount: number
  }>
}

