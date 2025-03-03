export interface FilterOption {
  id: string
  label: string
  count?: number
  isPopular?: boolean
}

export interface FilterCategory {
  id: string
  title: string
  tooltip: string
  options: {
    id: string
    label: string
  }[]
}

export interface FilterState {
  atmosphere: string[]
  offerings: string[]
  features: string[]
  rating: number
  location: string[]
  practical: string[]
  audienceType: "all" | "local" | "tourist"
  priceRange: [number, number]
  openNow: boolean
}

export interface FilterContextType {
  filters: FilterState
  setFilters: (filters: FilterState) => void
  resetFilters: () => void
}

