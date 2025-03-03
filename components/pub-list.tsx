import Image from "next/image"
import Link from "next/link"
import { Star, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Pub } from "@/types/pub"

export function PubList({ pubs }: { pubs: Pub[] }) {
  return (
    <div className="space-y-4">
      {pubs.map((pub) => (
        <Link key={pub.id} href={`/pub/${pub.id}`} className="block group">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="relative sm:w-48 aspect-video sm:aspect-square">
                  <Image src={pub.imageUrl || "/placeholder.svg"} alt={pub.name} fill className="object-cover" />
                  {pub.type.includes("historic") && (
                    <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">Historic</Badge>
                  )}
                </div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{pub.name}</h3>
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

                  <p className="text-sm mt-2">{pub.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {pub.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mt-3">{pub.specialty}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

