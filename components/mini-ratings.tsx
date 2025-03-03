interface Rating {
  label: string
  value: number
  color?: string
}

interface MiniRatingsProps {
  ratings: Rating[]
}

export function MiniRatings({ ratings }: MiniRatingsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {ratings.map((rating) => (
        <div key={rating.label} className="flex items-center gap-2">
          <span className="text-sm font-medium">{rating.label}</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i < Math.floor((rating.value / 10) * 5) ? "bg-primary" : "bg-primary/20"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">{rating.value}</span>
        </div>
      ))}
    </div>
  )
}

