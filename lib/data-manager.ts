import { promises as fs } from "fs"
import path from "path"
import type { Region, County, PubData, PubIndex } from "@/types/data"

const DATA_DIR = path.join(process.cwd(), "data")
const REGIONS_FILE = path.join(DATA_DIR, "regions.json")
const INDEXES_DIR = path.join(DATA_DIR, "indexes")
const PUBS_DIR = path.join(DATA_DIR, "pubs")

export class DataManager {
  private static instance: DataManager
  private regions: Region[] = []
  private indexes: Map<string, PubIndex[]> = new Map()

  private constructor() {}

  static async getInstance(): Promise<DataManager> {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager()
      await DataManager.instance.initialize()
    }
    return DataManager.instance
  }

  private async initialize() {
    // Ensure directories exist
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.mkdir(INDEXES_DIR, { recursive: true })
    await fs.mkdir(PUBS_DIR, { recursive: true })

    // Load regions
    try {
      const regionsData = await fs.readFile(REGIONS_FILE, "utf-8")
      this.regions = JSON.parse(regionsData)
    } catch (error) {
      this.regions = []
    }
  }

  async getRegions(): Promise<Region[]> {
    return this.regions
  }

  async getCountiesByRegion(regionSlug: string): Promise<County[]> {
    const region = this.regions.find((r) => r.slug === regionSlug)
    return region?.counties || []
  }

  private async loadIndex(region: string): Promise<PubIndex[]> {
    if (!this.indexes.has(region)) {
      const indexPath = path.join(INDEXES_DIR, `${region}.json`)
      try {
        const indexData = await fs.readFile(indexPath, "utf-8")
        this.indexes.set(region, JSON.parse(indexData))
      } catch (error) {
        this.indexes.set(region, [])
      }
    }
    return this.indexes.get(region) || []
  }

  async searchPubs(
    query: string,
    filters: {
      region?: string
      county?: string
      features?: string[]
      minRating?: number
    } = {},
  ): Promise<PubIndex[]> {
    const { region, county, features, minRating } = filters
    let results: PubIndex[] = []

    // Load relevant indexes
    if (region) {
      results = await this.loadIndex(region)
    } else {
      for (const r of this.regions) {
        const regionPubs = await this.loadIndex(r.slug)
        results.push(...regionPubs)
      }
    }

    // Apply filters
    return results.filter((pub) => {
      if (query && !pub.name.toLowerCase().includes(query.toLowerCase())) {
        return false
      }
      if (county && pub.county !== county) {
        return false
      }
      if (features?.length && !features.every((f) => pub.features.includes(f))) {
        return false
      }
      if (minRating && pub.rating < minRating) {
        return false
      }
      return true
    })
  }

  async getPub(id: string): Promise<PubData | null> {
    try {
      const [region, county] = id.split("-")
      const pubPath = path.join(PUBS_DIR, region, county, `${id}.json`)
      const pubData = await fs.readFile(pubPath, "utf-8")
      return JSON.parse(pubData)
    } catch (error) {
      return null
    }
  }

  async updatePub(pub: PubData): Promise<void> {
    const [region, county] = pub.id.split("-")
    const pubDir = path.join(PUBS_DIR, region, county)
    const pubPath = path.join(pubDir, `${pub.id}.json`)

    // Ensure directory exists
    await fs.mkdir(pubDir, { recursive: true })

    // Update pub data
    await fs.writeFile(pubPath, JSON.stringify(pub, null, 2))

    // Update index
    const index = await this.loadIndex(region)
    const indexEntry: PubIndex = {
      id: pub.id,
      name: pub.name,
      slug: pub.slug,
      region: pub.region,
      county: pub.county,
      rating: pub.rating.overall,
      features: pub.features,
      updatedAt: pub.updatedAt,
    }

    const existingIndex = index.findIndex((p) => p.id === pub.id)
    if (existingIndex >= 0) {
      index[existingIndex] = indexEntry
    } else {
      index.push(indexEntry)
    }

    await fs.writeFile(path.join(INDEXES_DIR, `${region}.json`), JSON.stringify(index, null, 2))
  }
}

