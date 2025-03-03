import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Beer, Coffee, Utensils, Music, Wifi, Gamepad, Dog } from "lucide-react"

export default function PubCategories() {
  const categories = [
    {
      name: "Real Ale Pubs",
      icon: <Beer className="h-8 w-8" />,
      slug: "search?category=real-ale",
    },
    {
      name: "Gastropubs",
      icon: <Utensils className="h-8 w-8" />,
      slug: "search?category=gastropubs",
    },
    {
      name: "Live Music",
      icon: <Music className="h-8 w-8" />,
      slug: "search?category=live-music",
    },
    {
      name: "Dog Friendly",
      icon: <Dog className="h-8 w-8" />,
      slug: "search?category=dog-friendly",
    },
    {
      name: "Historic Pubs",
      icon: <Coffee className="h-8 w-8" />,
      slug: "search?category=historic",
    },
    {
      name: "Games & Activities",
      icon: <Gamepad className="h-8 w-8" />,
      slug: "search?category=games-activities",
    },
    {
      name: "Work-Friendly",
      icon: <Wifi className="h-8 w-8" />,
      slug: "search?category=work-friendly",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {categories.map((category) => (
        <Link key={category.slug} href={`/${category.slug}`}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-4 h-full">
              <div className="mb-2 text-primary">{category.icon}</div>
              <h3 className="text-sm font-medium text-center">{category.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

