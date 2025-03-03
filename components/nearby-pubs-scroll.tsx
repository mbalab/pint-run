"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface NearbyPub {
  id: string
  name: string
  image: string
  rating: number
  distance: string
}

export function NearbyPubsScroll({ pubs }: { pubs: NearbyPub[] }) {
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
        {pubs.map((pub) => (
          <Link key={pub.id} href={`/pub/${pub.id}`} className="shrink-0">
            <Card className="w-[200px]">
              <CardContent className="p-3">
                <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-2">
                  <Image src={pub.image || "/placeholder.svg"} alt={pub.name} fill className="object-cover" />
                </div>
                <h3 className="font-medium truncate">{pub.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-muted-foreground">{pub.distance}</span>
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
                    <span className="text-sm font-medium">{pub.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

