import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface CompactRatingsProps {
  ratings: {
    overall: number
    ambience: number
    service: number
    value: number
    selection: number
  }
}

export function CompactRatings({ ratings }: CompactRatingsProps) {
  const categories = [
    { label: "Ambience", value: ratings.ambience, description: "Atmosphere & decor" },
    { label: "Service", value: ratings.service, description: "Staff & efficiency" },
    { label: "Value", value: ratings.value, description: "Price vs quality" },
    { label: "Selection", value: ratings.selection, description: "Drinks & food" },
  ]

  return (
    <div className="space-y-4">
      {/* Overall score */}
      <div className="flex items-center gap-4 p-3 bg-primary/10 rounded-lg">
        <div className="flex items-center">
          <Star className="h-5 w-5 fill-primary text-primary" />
          <span className="text-2xl font-bold ml-2">{ratings.overall}</span>
          <span className="text-sm text-muted-foreground ml-1">/10</span>
        </div>
        <div className="text-sm">
          <div className="font-medium">Pint Score</div>
          <div className="text-muted-foreground">Based on our rating criteria</div>
        </div>
      </div>

      {/* Category ratings */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category.label} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{category.label}</span>
              <span>{category.value}</span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full",
                    i < Math.floor(category.value) ? "bg-primary" : "bg-primary/10",
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

