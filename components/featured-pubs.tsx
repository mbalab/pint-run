import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function FeaturedPubs() {
  // Example data - would come from your data source in the real implementation
  const featuredPubs = [
    {
      id: "pub1",
      name: "The Red Lion",
      location: "London, England",
      image: "/placeholder.svg?height=300&width=400",
      rating: 8.7,
      description: "Historic pub with great ales and traditional British food",
      slug: "england/london/the-red-lion",
    },
    {
      id: "pub2",
      name: "The Black Bull",
      location: "Edinburgh, Scotland",
      image: "/placeholder.svg?height=300&width=400",
      rating: 9.1,
      description: "Cozy Scottish pub with an impressive whisky selection",
      slug: "scotland/edinburgh/the-black-bull",
    },
    {
      id: "pub3",
      name: "The Green Dragon",
      location: "Cardiff, Wales",
      image: "/placeholder.svg?height=300&width=400",
      rating: 8.4,
      description: "Vibrant Welsh pub with local craft beers and live music",
      slug: "wales/cardiff/the-green-dragon",
    },
    {
      id: "pub4",
      name: "The Crown & Anchor",
      location: "Belfast, Northern Ireland",
      image: "/placeholder.svg?height=300&width=400",
      rating: 8.9,
      description: "Traditional Irish pub with excellent food and atmosphere",
      slug: "northern-ireland/belfast/the-crown-and-anchor",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredPubs.map((pub) => (
        <Link key={pub.id} href={`/pub/${pub.slug}`} className="group">
          <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={pub.image || "/placeholder.svg"}
                alt={pub.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{pub.name}</h3>
                <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                  <Star className="h-3.5 w-3.5 mr-1 fill-primary" />
                  {pub.rating}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{pub.location}</p>
              <p className="text-sm line-clamp-2">{pub.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

