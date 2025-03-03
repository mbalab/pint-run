"use client"
import { Button } from "@/components/ui/button"
import { Users, Landmark } from "lucide-react"
import { useFilters } from "@/context/filter-context"

export function AudienceToggle() {
  const { filters, setFilters } = useFilters()

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Audience Type</label>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={filters.audienceType === "local" ? "default" : "outline"}
          className="w-full"
          onClick={() => setFilters({ ...filters, audienceType: filters.audienceType === "local" ? "all" : "local" })}
        >
          <Users className="mr-2 h-4 w-4" />
          Local Favorites
        </Button>
        <Button
          variant={filters.audienceType === "tourist" ? "default" : "outline"}
          className="w-full"
          onClick={() =>
            setFilters({ ...filters, audienceType: filters.audienceType === "tourist" ? "all" : "tourist" })
          }
        >
          <Landmark className="mr-2 h-4 w-4" />
          Tourist Spots
        </Button>
      </div>
    </div>
  )
}

