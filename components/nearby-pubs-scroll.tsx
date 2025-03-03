"use client"

import useSWR from "swr"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { PubData } from "@/types/data"

interface NearbyPubsScrollProps {
  currentPubId: string
  coordinates: {
    lat: number
    lng: number
  }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function NearbyPubsScroll({ currentPubId, coordinates }: NearbyPubsScrollProps) {
  const {
    data: pubs,
    error,
    isLoading,
  } = useSWR<PubData[]>(
    `/api/pubs/nearby?lat=${coordinates.lat}&lng=${coordinates.lng}&exclude=${currentPubId}`,
    fetcher,
  )

  if (error) {
    return <div>Failed to load nearby pubs</div>
  }

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-[200px] h-[200px] shrink-0" />
        ))}
      </div>
    )
  }

  if (!pubs?.length) {
    return <div>No nearby pubs found</div>
  }

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
        {pubs.map((pub) => (
          <Link key={pub.id} href={`/pub/${pub.slug}`} className="shrink-0">
            <Card className="w-[200px]">
              <CardContent className="p-3">
                <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-2">
                  <Image src={pub.images.primary || "/placeholder.svg"} alt={pub.name} fill className="object-cover" />
                </div>
                <h3 className="font-medium truncate">{pub.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-muted-foreground">0.5 miles</span>
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
                    <span className="text-sm font-medium">{pub.rating.overall}</span>
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

