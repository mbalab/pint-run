import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { RatingBadge } from "@/components/ui/rating-badge"
import { LocalsTouristsSlider } from "@/components/ui/locals-tourists-slider"

interface PubCardProps {
  pub: {
    id: string
    name: string
    slug: string
    image: string
    location: {
      neighborhood: string
      city: string
      country: string
    }
    rating: number
    primaryCategory: string
    localsTouristsValue: number
  }
  size?: "sm" | "md" | "lg"
}

export function PubCard({ pub, size = "md" }: PubCardProps) {
  const { name, slug, image, location, rating, primaryCategory, localsTouristsValue } = pub

  const url = `/${location.country.toLowerCase()}/${location.city.toLowerCase()}/${slug}`

  const sizeClasses = {
    sm: "max-w-xs",
    md: "max-w-sm",
    lg: "max-w-md",
  }

  const imageSizeClasses = {
    sm: "h-40",
    md: "h-48",
    lg: "h-56",
  }

  return (
    <Link href={url} className={`${sizeClasses[size]} group`}>
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
        <div className={`relative ${imageSizeClasses[size]} w-full overflow-hidden`}>
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <RatingBadge rating={rating} size={size === "lg" ? "md" : "sm"} />
          </div>
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {primaryCategory}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate whitespace-nowrap overflow-hidden" title={name}>
            {name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground mt-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-sm">
              {location.neighborhood}, {location.city}
            </span>
          </div>
          <div className="mt-3">
            <LocalsTouristsSlider value={localsTouristsValue} showLabel={false} size="sm" />
          </div>
        </div>
      </div>
    </Link>
  )
}

