export interface Pub {
  id: string
  name: string
  slug: string
  description: string
  images: string[]
  address: {
    street: string
    city: string
    region: string
    postalCode: string
    country: string
  }
  location: {
    lat: number
    lng: number
  }
  rating: {
    overall: number
    ambience: number
    service: number
    value: number
    selection: number
  }
  features: string[]
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  contact: {
    phone?: string
    email?: string
    website?: string
  }
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  dateAdded: string
  dateUpdated: string
}

export interface Country {
  id: string
  name: string
  slug: string
  image: string
  pubCount: number
  regions: Region[]
}

export interface Region {
  id: string
  name: string
  slug: string
  country: string
  pubCount: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
}

export interface SearchFilters {
  category?: string[]
  features?: string[]
  rating?: number
  openNow?: boolean
  region?: string
}

