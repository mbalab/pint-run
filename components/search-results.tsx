"use client"

import { useState } from "react"
import type { ViewMode } from "@/types/pub"
import { samplePubs } from "@/data/sample-pubs"
import { FilterPanel } from "@/components/filter-panel"
import { ViewToggle } from "@/components/view-toggle"
import { PubGrid } from "@/components/pub-grid"
import { PubList } from "@/components/pub-list"
import { PubMap } from "@/components/pub-map"

export default function SearchResults({ initialQuery }: { initialQuery?: string }) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  return (
    <div className="flex gap-8">
      <FilterPanel />

      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted-foreground">{samplePubs.length} pubs found</p>
          <ViewToggle mode={viewMode} onChange={setViewMode} />
        </div>

        {viewMode === "grid" && <PubGrid pubs={samplePubs} />}
        {viewMode === "list" && <PubList pubs={samplePubs} />}
        {viewMode === "map" && <PubMap pubs={samplePubs} />}
      </div>
    </div>
  )
}

