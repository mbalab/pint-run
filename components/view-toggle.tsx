import { Grid, List, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ViewMode } from "@/types/pub"

interface ViewToggleProps {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2">
      <Button variant={mode === "grid" ? "default" : "outline"} size="icon" onClick={() => onChange("grid")}>
        <Grid className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </Button>
      <Button variant={mode === "list" ? "default" : "outline"} size="icon" onClick={() => onChange("list")}>
        <List className="h-4 w-4" />
        <span className="sr-only">List view</span>
      </Button>
      <Button variant={mode === "map" ? "default" : "outline"} size="icon" onClick={() => onChange("map")}>
        <Map className="h-4 w-4" />
        <span className="sr-only">Map view</span>
      </Button>
    </div>
  )
}

