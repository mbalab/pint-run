"use server"

import { DataManager } from "@/lib/data-manager"
import type { PubData } from "@/types/data"

export async function searchPubs(
  query: string,
  options: {
    region?: string
    features?: string[]
    minRating?: number
    offset?: number
  },
): Promise<PubData[]> {
  const dataManager = await DataManager.getInstance()
  return dataManager.searchPubs(query, options)
}

export async function getNearbyPubs(lat: number, lng: number, currentPubId: string, radius = 5): Promise<PubData[]> {
  const dataManager = await DataManager.getInstance()
  return dataManager.searchPubs("", {
    near: { lat, lng, radius },
    limit: 5,
    exclude: currentPubId,
  })
}

