"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PubGrid } from "@/components/pub-grid"
import { PubList } from "@/components/pub-list"
import { PubMap } from "@/components/pub-map"
import { ViewToggle } from "@/components/view-toggle"
import { useFilters } from "@/context/filter-context"
import type { PubData } from "@/types/data"

interface SearchResultsProps {
  initialPubs: PubData[]
}

export function SearchResults({ initialPubs }: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [pubs] = useState(initialPubs)
  const { filters } = useFilters()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Client-side filtering based on current filters
  const filteredPubs = pubs.filter((pub) => {
    if (filters.minRating && pub.rating.overall < filters.minRating) {
      return false
    }
    if (filters.features?.length && !filters.features.every((f) => pub.features.includes(f))) {
      return false
    }
    return true
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">{filteredPubs.length} pubs found</p>
        <ViewToggle mode={viewMode} onChange={setViewMode} />
      </div>

      {viewMode === "grid" && <PubGrid pubs={filteredPubs} />}
      {viewMode === "list" && <PubList pubs={filteredPubs} />}
      {viewMode === "map" && <PubMap pubs={filteredPubs} />}
    </div>
  )
}

