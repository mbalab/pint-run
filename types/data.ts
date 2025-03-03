export interface Region {
  id: string
  name: string
  slug: string
  counties: County[]
  totalPubs: number
  lastUpdated: string
}

export interface County {
  id: string
  name: string
  slug: string
  region: string
  totalPubs: number
  lastUpdated: string
}

export interface PubIndex {
  id: string
  name: string
  slug: string
  region: string
  county: string
  rating: number
  features: string[]
  updatedAt: string
}

export interface PubData {
  id: string
  name: string
  slug: string
  description: string
  region: string
  county: string
  address: {
    street: string
    city: string
    postalCode: string
  }
  coordinates: {
    lat: number
    lng: number
  }
  contact: {
    phone?: string
    website?: string
    email?: string
    social?: {
      facebook?: string
      twitter?: string
      instagram?: string
    }
  }
  features: string[]
  rating: {
    overall: number
    atmosphere: number
    service: number
    value: number
    selection: number
  }
  openingHours: {
    [key: string]: {
      open: string
      close: string
      kitchen?: {
        open: string
        close: string
      }
    }
  }
  images: {
    primary: string
    gallery: string[]
  }
  updatedAt: string
  sourceId: string
}

export interface DataUpdateStatus {
  lastRun: string
  status: "idle" | "running" | "failed" | "completed"
  error?: string
  stats?: {
    total: number
    updated: number
    failed: number
  }
}

