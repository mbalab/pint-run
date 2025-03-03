import type { ApifyRawData, TransformedPubData } from "@/types/apify"

// Helper function to extract features from additionalInfo
function extractFeatures(additionalInfo: Record<string, any[]>) {
  const features: string[] = []

  if (typeof additionalInfo !== "object") return features

  Object.entries(additionalInfo).forEach(([category, items]) => {
    items.forEach((item) => {
      Object.entries(item).forEach(([feature, value]) => {
        if (value === true) {
          features.push(feature)
        }
      })
    })
  })

  return features
}

// Helper function to format opening hours
function formatOpeningHours(hours: { day: string; hours: string }[]) {
  const formattedHours: Record<string, { hours: string; busy: boolean }> = {}

  if (Array.isArray(hours)) {
    hours.forEach(({ day, hours }) => {
      const dayLower = day.toLowerCase()
      formattedHours[dayLower] = {
        hours,
        busy: dayLower === "friday" || dayLower === "saturday",
      }
    })
  }

  return formattedHours
}

// Helper to determine region based on postcode
function determineRegion(postcode: string): string {
  const firstLetter = postcode.trim().charAt(0).toUpperCase()

  // Basic UK postcode region mapping
  const regionMap: Record<string, string> = {
    E: "England",
    EC: "England",
    W: "England",
    WC: "England",
    N: "England",
    NW: "England",
    SE: "England",
    SW: "England",
    G: "Scotland",
    EH: "Scotland",
    CF: "Wales",
    BT: "Northern Ireland",
  }

  return regionMap[firstLetter] || "England"
}

export function transformPubData(raw: ApifyRawData): TransformedPubData {
  // Generate a unique ID
  const id = `gm-${raw.placeId}`.toLowerCase()

  // Extract region from postcode
  const region = raw.postalCode ? determineRegion(raw.postalCode) : "England"

  // Extract features
  const features = [
    ...(raw.categories || []),
    ...(raw.placesTags || []),
    ...(raw.reviewsTags || []),
    ...extractFeatures(raw.additionalInfo || {}),
  ]

  return {
    id,
    sourcePlatform: "Google Maps",
    sourceId: raw.placeId,
    name: raw.title,
    description: raw.description || "",
    country: "United Kingdom",
    countryCode: raw.countryCode || "GB",
    region,
    city: raw.city || "",
    neighborhood: raw.neighborhood || "",
    address: raw.address,
    coordinates: raw.location || {},
    contact: {
      website: raw.website,
      phone: raw.phone,
      phoneUnformatted: raw.phoneUnformatted,
      socialMedia: {}, // Will implement social media extraction if needed
    },
    openingHours: formatOpeningHours(raw.openingHours || []),
    ratings: {
      google: {
        score: raw.totalScore || 0,
        count: raw.reviewsCount || 0,
      },
    },
    features,
    priceRange: raw.price,
    images: {
      primaryImage: raw.imageUrl,
      totalImages: raw.imagesCount || 0,
      categories: raw.imageCategories || [],
    },
    additionalInfo: {
      kitchenHours: raw.additionalOpeningHours?.Kitchen || [],
      reservations: raw.reserveTableUrl ? true : false,
    },
    metadata: {
      scrapedAt: raw.scrapedAt,
      permanentlyClosed: raw.permanentlyClosed || false,
      temporarilyClosed: raw.temporarilyClosed || false,
    },
  }
}

