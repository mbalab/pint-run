export interface Pub {
  id: string
  name: string
  location: {
    city: string
    country: string
  }
  rating: number
  description: string
  features: string[]
  type: ("historic" | "traditional" | "modern")[]
  specialty: string
  imageUrl: string
  priceRange: 1 | 2 | 3 | 4 | 5
}

export type ViewMode = "grid" | "list" | "map"

