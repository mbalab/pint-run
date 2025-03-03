interface RatingBreakdownProps {
  ratings: {
    overall: number
    ambience: number
    service: number
    value: number
    selection: number
  }
}

export function RatingBreakdown({ ratings }: RatingBreakdownProps) {
  const categories = [
    { label: "Ambience", value: ratings.ambience, description: "Atmosphere, decor, noise level" },
    { label: "Service", value: ratings.service, description: "Staff friendliness, efficiency" },
    { label: "Value", value: ratings.value, description: "Price relative to quality" },
    { label: "Selection", value: ratings.selection, description: "Drinks and food variety" },
  ]

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.label} className="space-y-2">
          <div className="flex justify-between items-baseline">
            <div>
              <span className="font-medium">{category.label}</span>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
            <span className="font-medium">{category.value}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${(category.value / 10) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

