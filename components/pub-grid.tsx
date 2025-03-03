import Image from "next/image"
import Link from "next/link"
import { Star, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Pub } from "@/types/pub"

export function PubGrid({ pubs }: { pubs: Pub[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pubs.map((pub) => (
        <Link key={pub.id} href={`/pub/${pub.id}`} className="group">
          <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={pub.imageUrl || "/placeholder.svg"}
                alt={pub.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {pub.type.includes("historic") && (
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">Historic</Badge>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-bold truncate">{pub.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {pub.location.city}, {pub.location.country}
                  </p>
                </div>
                <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded">
                  <Star className="h-3.5 w-3.5 mr-1 fill-primary" />
                  <span className="font-medium">{pub.rating}</span>
                </div>
              </div>

              <p className="text-sm mt-2 line-clamp-2">{pub.description}</p>

              <div className="mt-3 flex flex-wrap gap-1">
                {pub.features.slice(0, 3).map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {pub.features.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{pub.features.length - 3}
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground mt-3 border-t pt-3">{pub.specialty}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

