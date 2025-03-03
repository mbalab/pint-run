import { Badge } from "@/components/ui/badge"

interface OpeningHours {
  [key: string]: {
    hours: string
    busy: boolean
  }
}

export function CompactHours({ hours }: { hours: OpeningHours }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
      {Object.entries(hours).map(([day, { hours, busy }]) => (
        <div key={day} className="flex items-center justify-between">
          <span className="capitalize">{day}</span>
          <div className="flex items-center gap-2">
            {busy && (
              <Badge variant="secondary" className="h-5 px-1.5">
                Busy
              </Badge>
            )}
            <span className="text-muted-foreground">{hours}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

