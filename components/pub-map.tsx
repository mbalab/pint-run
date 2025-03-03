import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Pub } from "@/types/pub"

export function PubMap({ pubs }: { pubs: Pub[] }) {
  return (
    <div className="aspect-[3/2] bg-muted rounded-lg overflow-hidden flex items-center justify-center">
      <div className="text-center p-6">
        <MapPin className="h-12 w-12 mx-auto mb-2 text-primary" />
        <h3 className="text-lg font-medium mb-2">Map View</h3>
        <p className="text-sm text-muted-foreground mb-4">{pubs.length} pubs found in search results</p>
        <Button>Load Interactive Map</Button>
      </div>
    </div>
  )
}

