import { PubCard } from "@/components/pub/pub-card"

interface PubGridProps {
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

export function PubGrid({ pubs }: PubGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pubs.map((pub) => (
        <PubCard key={pub.id} pub={pub} />
      ))}
    </div>
  )
}

