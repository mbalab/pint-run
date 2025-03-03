import { NextResponse } from "next/server"
import { DataManager } from "@/lib/data-manager"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = Number.parseFloat(searchParams.get("lat") || "0")
    const lng = Number.parseFloat(searchParams.get("lng") || "0")
    const exclude = searchParams.get("exclude") || ""

    const dataManager = await DataManager.getInstance()
    const pubs = await dataManager.searchPubs("", {
      near: { lat, lng, radius: 5 },
      limit: 5,
      exclude,
    })

    return NextResponse.json(pubs)
  } catch (error) {
    console.error("Failed to fetch nearby pubs:", error)
    return NextResponse.json({ error: "Failed to fetch nearby pubs" }, { status: 500 })
  }
}

