import Link from "next/link"
import { Beer, History, Utensils, Tv, Music, Coffee, Users } from "lucide-react"

const categories = [
  {
    name: "Historical Pubs",
    slug: "historical-pubs",
    icon: History,
  },
  {
    name: "Best Ales",
    slug: "best-ales",
    icon: Beer,
  },
  {
    name: "Sunday Roasts",
    slug: "sunday-roasts",
    icon: Utensils,
  },
  {
    name: "Sports Pubs",
    slug: "sports-pubs",
    icon: Tv,
  },
  {
    name: "Lively Pubs",
    slug: "lively-pubs",
    icon: Music,
  },
  {
    name: "Quiet Pubs",
    slug: "quiet-pubs",
    icon: Coffee,
  },
  {
    name: "Family-Friendly",
    slug: "family-friendly",
    icon: Users,
  },
]

export function CategoryNav() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Explore by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Link
              key={category.slug}
              href={`/search?category=${encodeURIComponent(category.name)}`}
              className="flex flex-col items-center justify-center p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors text-center"
            >
              <Icon className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

