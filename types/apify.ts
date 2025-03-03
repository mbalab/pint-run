// Raw Apify data structure from Google Maps scraper
export interface ApifyRawData {
  placeId: string
  title: string
  description?: string
  location: {
    lat: number
    lng: number
  }
  address: string
  city?: string
  countryCode?: string
  website?: string
  phone?: string
  emails?: string[]
  socialMedia?: {
    facebook?: string
    twitter?: string
    instagram?: string
  }
  openingHours?: {
    day: string
    hours: string
  }[]
  totalScore?: number
  reviewsCount?: number
  reviewsDistribution?: {
    [key: string]: number
  }
  categories?: string[]
  additionalInfo?: string[]
  reviewsTags?: string[]
  imageUrl?: string
  imagesCount?: number
  imageCategories?: string[]
  scrapedAt: string
  openingHoursBusinessConfirmationText?: string
}

// Transformed pub data structure matching our schema
export interface TransformedPubData {
  id: string
  sourcePlatform: "Google Maps"
  sourceId: string
  name: string
  description: string
  country: string
  countryCode: string
  region: string
  city: string
  neighborhood?: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  contact: {
    website?: string
    phone?: string
    email?: string
    socialMedia?: {
      facebook?: string
      twitter?: string
      instagram?: string
    }
  }
  openingHours: {
    [key: string]: {
      hours: string
      busy: boolean
    }
  }
  ratings: {
    google: {
      score: number
      count: number
      distribution: {
        [key: string]: number
      }
    }
  }
  features: string[]
  specialties: string[]
  historicalDetails?: string
  reviewKeywords: string[]
  additionalInfo: string[]
  images: {
    primaryImage?: string
    totalImages: number
    categories: string[]
  }
  metadata: {
    scrapedAt: string
    lastUpdatedBy?: string
    lastUpdatedAt?: string
  }
}

export interface ApifyPaginationInfo {
  total: number
  offset: number
  count: number
  limit: number
}

export interface ApifyResponse {
  data: ApifyRawData[]
  total: number
  offset: number
  count: number
  limit: number
}

