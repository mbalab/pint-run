import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { DataManager } from "@/lib/data-manager"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const dataManager = await DataManager.getInstance()

    // Validate the incoming data
    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    const results = {
      total: data.length,
      updated: 0,
      failed: 0,
      errors: [] as string[],
    }

    // Process each pub
    for (const pubData of data) {
      try {
        await dataManager.updatePub(pubData)
        results.updated++

        // Revalidate relevant paths
        revalidatePath(`/pub/${pubData.id}`)
        revalidatePath(`/${pubData.region}`)
        revalidatePath(`/${pubData.region}/${pubData.county}`)
      } catch (error) {
        results.failed++
        results.errors.push(`Failed to update ${pubData.id}: ${error.message}`)
      }
    }

    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

