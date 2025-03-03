import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"
import type { ApifyRawData } from "@/types/apify"
import { transformPubData } from "@/lib/transform-pub-data"

// Initialize rate limiter
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "1 m"), // 20 requests per minute
})

const DATASET_ID = "OhlrRqjJvOJTewp9d"
const ITEMS_PER_PAGE = 50

export async function GET(request: Request) {
  try {
    // Rate limiting
    const ip = headers().get("x-forwarded-for") || "anonymous"
    const { success, limit, reset, remaining } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        {
          error: "Too many requests",
          limit,
          reset,
          remaining,
        },
        { status: 429 },
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const region = searchParams.get("region")
    const city = searchParams.get("city")
    const features = searchParams.getAll("features[]")
    const minRating = Number.parseFloat(searchParams.get("minRating") || "0")
    const sortBy = searchParams.get("sortBy") || "rating"

    if (!process.env.APIFY_API_TOKEN) {
      return NextResponse.json({ error: "API token not configured" }, { status: 500 })
    }

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
      const error = await response.text()
      console.error("Apify API error:", error)
      return NextResponse.json({ error: "Failed to fetch data from Apify" }, { status: response.status })
    }

    const rawData: ApifyRawData[] = await response.json()

    // Transform the data
    let transformedData = rawData.map(transformPubData)

    // Apply filters
    if (region) {
      transformedData = transformedData.filter((pub) => pub.region.toLowerCase() === region.toLowerCase())
    }

    if (city) {
      transformedData = transformedData.filter((pub) => pub.city.toLowerCase().includes(city.toLowerCase()))
    }

    if (features.length > 0) {
      transformedData = transformedData.filter((pub) =>
        features.every((feature) => pub.features.some((f) => f.toLowerCase().includes(feature.toLowerCase()))),
      )
    }

    if (minRating > 0) {
      transformedData = transformedData.filter((pub) => pub.ratings.google.score >= minRating)
    }

    // Sort data
    switch (sortBy) {
      case "rating":
        transformedData.sort((a, b) => b.ratings.google.score - a.ratings.google.score)
        break
      case "name":
        transformedData.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "reviews":
        transformedData.sort((a, b) => b.ratings.google.count - a.ratings.google.count)
        break
    }

    // Get total count from dataset
    const datasetInfo = await fetch(`https://api.apify.com/v2/datasets/${DATASET_ID}`, {
      headers: {
        Authorization: `Bearer ${process.env.APIFY_API_TOKEN}`,
      },
    }).then((res) => res.json())

    return NextResponse.json({
      data: transformedData,
      pagination: {
        total: datasetInfo.itemCount,
        offset,
        count: transformedData.length,
        limit: ITEMS_PER_PAGE,
      },
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

