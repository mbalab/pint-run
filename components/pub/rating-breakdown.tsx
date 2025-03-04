interface RatingProps {
  ratings: {
    atmosphere: number
    drinks: number
    food: number
    history: number
  }
}

export function RatingBreakdown({ ratings }: RatingProps) {
  const ratingItems = [
    { name: "Atmosphere", value: ratings.atmosphere },
    { name: "Drinks", value: ratings.drinks },
    { name: "Food", value: ratings.food },
    { name: "History", value: ratings.history },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {ratingItems.map((rating) => (
        <div key={rating.name} className="p-3 rounded-lg border bg-card flex items-center" style={{ height: "50px" }}>
          <div className="flex justify-between items-center w-full">
            <h3 className="text-sm font-medium">{rating.name}</h3>
            <div className="flex items-center">
              <span className="text-sm font-semibold">{rating.value.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground ml-1">/10</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

