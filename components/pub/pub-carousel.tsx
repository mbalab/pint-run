"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PubCard } from "@/components/pub/pub-card"
import { Button } from "@/components/ui/button"

interface PubCarouselProps {
  title: string
  description?: string
  pubs: Array<{
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
  }>
}

export function PubCarousel({ title, description, pubs }: PubCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {pubs.map((pub) => (
          <div key={pub.id} className="snap-start flex-shrink-0 w-[280px]">
            <PubCard pub={pub} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <Button variant="outline" size="icon" onClick={scrollLeft} aria-label="Scroll left">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={scrollRight} aria-label="Scroll right">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Update PubCard component to truncate pub name properly.

