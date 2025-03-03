import type { ApifyRawData, TransformedPubData } from "@/types/apify"
import { DataManager } from "@/lib/data-manager"

const DATASET_ID = "OhlrRqjJvOJTewp9d"
const ITEMS_PER_PAGE = 50

export class DataIntegration {
  private static instance: DataIntegration
  private dataManager: DataManager

  private constructor(dataManager: DataManager) {
    this.dataManager = dataManager
  }

  static async getInstance(): Promise<DataIntegration> {
    if (!DataIntegration.instance) {
      const dataManager = await DataManager.getInstance()
      DataIntegration.instance = new DataIntegration(dataManager)
    }
    return DataIntegration.instance
  }

  async fetchAndProcessPubs(offset = 0): Promise<{
    success: boolean
    processed: number
    errors: string[]
  }> {
    try {
      // Fetch data from Apify
      const response = await fetch(
        `https://api.apify.com/v2/datasets/${DATASET_ID}/items?offset=${offset}&limit=${ITEMS_PER_PAGE}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.APIFY_API_TOKEN}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error(`Apify API error: ${response.status}`)
      }

      const rawData: ApifyRawData[] = await response.json()
      const errors: string[] = []
      let processed = 0

      // Process each pub
      for (const rawPub of rawData) {
        try {
          const transformedPub = await this.transformPubData(rawPub)
          await this.dataManager.updatePub(transformedPub)
          processed++
        } catch (error) {
          errors.push(`Failed to process pub ${rawPub.placeId}: ${error.message}`)
        }
      }

      return {
        success: true,
        processed,
        errors,
      }
    } catch (error) {
      console.error("Data integration error:", error)
      return {
        success: false,
        processed: 0,
        errors: [error.message],
      }
    }
  }

  private async transformPubData(raw: ApifyRawData): Promise<TransformedPubData> {
    // Extract features from additionalInfo
    const features = this.extractFeatures(raw.additionalInfo)

    // Format opening hours
    const openingHours = this.formatOpeningHours(raw.openingHours)

    // Generate slug
    const slug = this.generateSlug(raw.title)

    return {
      id: `gm-${raw.placeId}`.toLowerCase(),
      name: raw.title,
      slug,
      description: raw.description || "",
      region: this.determineRegion(raw.postalCode),
      county: this.determineCounty(raw.location),
      address: {
        street: raw.street || "",
        city: raw.city || "",
        postalCode: raw.postalCode || "",
      },
      coordinates: raw.location,
      contact: {
        phone: raw.phone,
        website: raw.website,
        email: raw.emails?.[0],
      },
      features,
      rating: {
        overall: raw.totalScore || 0,
        atmosphere: 0, // To be calculated from reviews
        service: 0,
        value: 0,
        selection: 0,
      },
      openingHours,
      images: {
        primary: raw.imageUrl || "",
        gallery: [], // To be populated with additional images
      },
      updatedAt: new Date().toISOString(),
      sourceId: raw.placeId,
    }
  }

  private extractFeatures(additionalInfo: any): string[] {
    const features: string[] = []

    if (typeof additionalInfo !== "object") return features

    Object.entries(additionalInfo).forEach(([category, items]) => {
      if (Array.isArray(items)) {
        items.forEach((item) => {
          Object.entries(item).forEach(([feature, value]) => {
            if (value === true) {
              features.push(feature)
            }
          })
        })
      }
    })

    return features
  }

  private formatOpeningHours(hours: any[]): Record<string, { open: string; close: string }> {
    const formatted: Record<string, { open: string; close: string }> = {}

    if (!Array.isArray(hours)) return formatted

    hours.forEach(({ day, hours }) => {
      const [open, close] = hours.split(" to ").map((t) => t.trim())
      formatted[day.toLowerCase()] = { open, close }
    })

    return formatted
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  private determineRegion(postcode?: string): string {
    if (!postcode) return "england"

    const firstChar = postcode.charAt(0).toUpperCase()
    const regionMap: Record<string, string> = {
      E: "england",
      W: "wales",
      G: "scotland",
      BT: "northern-ireland",
    }

    return regionMap[firstChar] || "england"
  }

  private determineCounty(location: { lat: number; lng: number }): string {
    // This would use a geocoding service or region mapping
    // For now, returning a placeholder
    return "london"
  }
}

