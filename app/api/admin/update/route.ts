import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { DataIntegration } from "@/lib/data-integration"

export async function POST() {
  try {
    const dataIntegration = await DataIntegration.getInstance()
    const results = {
      batches: [] as Array<{
        offset: number
        processed: number
        errors: string[]
      }>,
    }

    // Process in batches of 50
    for (let offset = 0; offset < 1000; offset += 50) {
      const batchResult = await dataIntegration.fetchAndProcessPubs(offset)

      results.batches.push({
        offset,
        processed: batchResult.processed,
        errors: batchResult.errors,
      })

      if (batchResult.processed === 0) break // No more data
    }

    // Revalidate main pages
    revalidatePath("/")
    revalidatePath("/search")

    return NextResponse.json(results)
  } catch (error) {
    console.error("Update failed:", error)
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}

