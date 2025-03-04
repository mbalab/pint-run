import { getRatingColor } from "@/lib/utils"

interface RatingBadgeProps {
  rating: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function RatingBadge({ rating, size = "md", showLabel = true }: RatingBadgeProps) {
  const color = getRatingColor(rating)

  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5 min-w-[28px] text-center",
    md: "text-sm px-2 py-1 min-w-[32px] text-center",
    lg: "text-base px-3 py-1.5 font-medium min-w-[40px] text-center",
  }

  return (
    <div className="flex items-center gap-1">
      <span className={`${color} ${sizeClasses[size]} rounded-md text-white font-semibold`}>{rating.toFixed(1)}</span>
      {showLabel && <span className="text-xs text-muted-foreground">/10</span>}
    </div>
  )
}

