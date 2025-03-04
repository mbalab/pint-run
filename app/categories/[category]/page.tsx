import type { Metadata } from "next"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PubGrid } from "@/components/pub/pub-grid"

interface CategoryPageProps {
  params: {
    category: string
  }
}

// This would typically come from a database or API
const categoryData = {
  "historical-pubs": {
    title: "Historical Pubs",
    description:
      "Discover pubs with centuries of history, from medieval taverns to Victorian gin palaces. These historic establishments have stories to tell and unique atmospheres that can't be replicated.",
    pubs: [
      {
        id: "1",
        name: "The George Inn",
        slug: "the-george-inn",
        image: "/placeholder.svg?height=300&width=500",
        location: {
          neighborhood: "Southwark",
          city: "london",
          country: "uk",
        },
        rating: 9.0,
        primaryCategory: "Historical Pubs",
        localsTouristsValue: 75,
      },
      {
        id: "2",
        name: "Ye Olde Cheshire Cheese",
        slug: "ye-olde-cheshire-cheese",
        image: "/placeholder.svg?height=300&width=500",
        location: {
          neighborhood: "Fleet Street",
          city: "london",
          country: "uk",
        },
        rating: 8.8,
        primaryCategory: "Historical Pubs",
        localsTouristsValue: 65,
      },
      {
        id: "3",
        name: "The Spaniards Inn",
        slug: "the-spaniards-inn",
        image: "/placeholder.svg?height=300&width=500",
        location: {
          neighborhood: "Hampstead",
          city: "london",
          country: "uk",
        },
        rating: 8.9,
        primaryCategory: "Historical Pubs",
        localsTouristsValue: 30,
      },
      {
        id: "4",
        name: "The Prospect of Whitby",
        slug: "the-prospect-of-whitby",
        image: "/placeholder.svg?height=300&width=500",
        location: {
          neighborhood: "Wapping",
          city: "london",
          country: "uk",
        },
        rating: 8.7,
        primaryCategory: "Historical Pubs",
        localsTouristsValue: 70,
      },
      {
        id: "5",
        name: "The Mayflower",
        slug: "the-mayflower",
        image: "/placeholder.svg?height=300&width=500",
        location: {
          neighborhood: "Rotherhithe",
          city: "london",
          country: "uk",
        },
        rating: 8.5,
        primaryCategory: "Historical Pubs",
        localsTouristsValue: 80,
      },
      {
        id: "6",
        name: "The Old Bank of England",
        slug: "the-old-bank-of-england",
        image: "/placeholder.svg?height=300&width=500",
        location: {
          neighborhood: "Fleet Street",
          city: "london",
          country: "uk",
        },
        rating: 8.3,
        primaryCategory: "Historical Pubs",
        localsTouristsValue: 60,
      },
    ],
  },
  "best-ales": {
    title: "Best Ales",
    description:
      "For ale enthusiasts, these pubs offer exceptional selections of traditional cask ales, craft beers, and unique brews. Expect knowledgeable staff and perfectly kept pints.",
    pubs: [
      {
        id: "1",
        name: "The Craft Beer Co.",
        slug: "the-craft-beer-co",
        image: "/placeholder.svg?height=300&width=500",
        location: {
          neighborhood: "Clerkenwell",
          city: "london",
          country: "uk",
        },
        rating: 9.1,
        primaryCategory: "Best Ales",
        localsTouristsValue: 45,
      },
      {
        id: "2",
        name: "The Southampton Arms",
        slug: "the-southampton-arms",
        image: "/placeholder.svg?height=300&width=500",
        location: {
          neighborhood: "Kentish Town",
          city: "london",
          country: "uk",
        },
        rating: 9.3,
        primaryCategory: "Best Ales",
        localsTouristsValue: 20,
      },
      {
        id: "3",
        name: "The Harp",
        slug: "the-harp",
        image: "/placeholder.svg?height=300&width=500",
        location: {
          neighborhood: "Covent Garden",
          city: "london",
          country: "uk",
        },
        rating: 9.2,
        primaryCategory: "Best Ales",
        localsTouristsValue: 60,
      },
      {
        id: "4",
        name: "The Euston Tap",
        slug: "the-euston-tap",
        image: "/placeholder.svg?height=300&width=500",
        location: {
          neighborhood: "Euston",
          city: "london",
          country: "uk",
        },
        rating: 8.9,
        primaryCategory: "Best Ales",
        localsTouristsValue: 50,
      },
    ],
  },
  // Other categories would be defined similarly
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = params
  const categoryInfo = categoryData[category as keyof typeof categoryData]

  if (!categoryInfo) {
    return {
      title: "Category Not Found | Pint Run",
      description: "The requested pub category could not be found.",
    }
  }

  return {
    title: `${categoryInfo.title} | Pint Run`,
    description: categoryInfo.description,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params
  const categoryInfo = categoryData[category as keyof typeof categoryData]

  if (!categoryInfo) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Category Not Found</h1>
        <p>The requested pub category could not be found.</p>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <Breadcrumb
        items={[
          { label: "Categories", href: "/categories" },
          { label: categoryInfo.title, href: `/categories/${category}` },
        ]}
      />

      <div className="py-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryInfo.title}</h1>
        <p className="text-muted-foreground max-w-3xl mb-8">{categoryInfo.description}</p>

        <div className="mb-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Sort by:</span>
            <select className="border rounded-md px-2 py-1 bg-background">
              <option>Highest Rated</option>
              <option>Alphabetical</option>
              <option>Most Popular</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Location:</span>
            <select className="border rounded-md px-2 py-1 bg-background">
              <option>All Locations</option>
              <option>Central London</option>
              <option>East London</option>
              <option>North London</option>
              <option>South London</option>
              <option>West London</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Features:</span>
            <select className="border rounded-md px-2 py-1 bg-background">
              <option>All Features</option>
              <option>Beer Garden</option>
              <option>Live Music</option>
              <option>Food Served</option>
              <option>Dog Friendly</option>
            </select>
          </div>
        </div>

        <PubGrid pubs={categoryInfo.pubs} />
      </div>
    </div>
  )
}

