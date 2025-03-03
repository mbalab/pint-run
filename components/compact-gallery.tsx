"use client"

import * as React from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface CompactGalleryProps {
  images: string[]
  alt: string
}

export function CompactGallery({ images, alt }: CompactGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null)

  return (
    <div className="grid grid-cols-2 gap-2">
      {images.slice(0, 4).map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <button
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-md",
                index === 0 && "col-span-2 aspect-[2/1]",
              )}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${alt} - Image ${index + 1}`}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              {index === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                  <span className="text-lg font-medium">+{images.length - 4}</span>
                </div>
              )}
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <div className="relative aspect-[3/2]">
              <Image src={selectedImage || image} alt={`${alt} - Image ${index + 1}`} fill className="object-contain" />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}

