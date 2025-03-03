"use client"

import React from "react"

import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CompactPubHeaderProps {
  name: string
  features: string[]
  rating: number
  images: string[]
}

export function CompactPubHeader({ name, features, rating, images }: CompactPubHeaderProps) {
  const [currentImage, setCurrentImage] = React.useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      {/* Image carousel */}
      <div className="relative h-[300px] bg-black">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt={`${name} - Image ${currentImage + 1}`}
          fill
          className="object-cover"
          priority
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white"
          onClick={previousImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={cn("w-1.5 h-1.5 rounded-full", index === currentImage ? "bg-white" : "bg-white/50")}
            />
          ))}
        </div>
      </div>

      {/* Header content */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{name}</h1>
            <div className="flex flex-wrap gap-1">
              {features.map((feature) => (
                <Badge key={feature} variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 text-white">
            <Star className="h-4 w-4 fill-white mr-1.5" />
            <span className="font-bold">{rating}</span>
            <span className="text-white/80 ml-1">/10</span>
          </div>
        </div>
      </div>
    </div>
  )
}

