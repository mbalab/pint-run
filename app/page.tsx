import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PubCarousel } from "@/components/pub/pub-carousel"
import { CategoryNav } from "@/components/pub/category-nav"
import { BlogCard } from "@/components/blog/blog-card"
import { PubCard } from "@/components/pub/pub-card"
import { GeoSearchInput } from "@/components/geo-search-input"

// Sample data - in a real app, this would come from an API or database
const topRatedPubs = [
  {
    id: "1",
    name: "The Red Lion",
    slug: "the-red-lion",
    image: "/placeholder.svg?height=300&width=500",
    location: {
      neighborhood: "Soho",
      city: "london",
      country: "uk",
    },
    rating: 9.2,
    primaryCategory: "Historical Pubs",
    localsTouristsValue: 60,
  },
  {
    id: "2",
    name: "The Crown & Anchor",
    slug: "the-crown-and-anchor",
    image: "/placeholder.svg?height=300&width=500",
    location: {
      neighborhood: "Covent Garden",
      city: "london",
      country: "uk",
    },
    rating: 8.7,
    primaryCategory: "Best Ales",
    localsTouristsValue: 40,
  },
  {
    id: "3",
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
    id: "4",
    name: "The Lamb & Flag",
    slug: "the-lamb-and-flag",
    image: "/placeholder.svg?height=300&width=500",
    location: {
      neighborhood: "Covent Garden",
      city: "london",
      country: "uk",
    },
    rating: 8.5,
    primaryCategory: "Lively Pubs",
    localsTouristsValue: 50,
  },
  {
    id: "5",
    name: "The Spaniards Inn",
    slug: "the-spaniards-inn",
    image: "/placeholder.svg?height=300&width=500",
    location: {
      neighborhood: "Hampstead",
      city: "london",
      country: "uk",
    },
    rating: 8.9,
    primaryCategory: "Sunday Roasts",
    localsTouristsValue: 30,
  },
]

const featuredNeighborhoods = [
  {
    id: "1",
    name: "Soho",
    slug: "soho",
    city: "London",
    image: "/placeholder.svg?height=300&width=500",
    pubCount: 42,
  },
  {
    id: "2",
    name: "Camden",
    slug: "camden",
    city: "London",
    image: "/placeholder.svg?height=300&width=500",
    pubCount: 38,
  },
  {
    id: "3",
    name: "Shoreditch",
    slug: "shoreditch",
    city: "London",
    image: "/placeholder.svg?height=300&width=500",
    pubCount: 35,
  },
  {
    id: "4",
    name: "Notting Hill",
    slug: "notting-hill",
    city: "London",
    image: "/placeholder.svg?height=300&width=500",
    pubCount: 28,
  },
]

const recentBlogPosts = [
  {
    id: "1",
    title: "The 10 Oldest Pubs in London You Must Visit",
    slug: "oldest-pubs-london",
    excerpt:
      "Discover the historic pubs that have been serving Londoners for centuries, each with its own unique story and atmosphere.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Historical",
    readTime: 6,
    date: "May 15, 2023",
  },
  {
    id: "2",
    title: "A Guide to London's Best Craft Beer Pubs",
    slug: "craft-beer-pubs-london",
    excerpt:
      "Explore London's thriving craft beer scene with our guide to the best pubs serving unique and locally brewed beers.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Craft Beer",
    readTime: 8,
    date: "April 28, 2023",
  },
  {
    id: "3",
    title: "Sunday Roast Showdown: London's Top 5 Pubs",
    slug: "sunday-roast-showdown",
    excerpt:
      "We compare the Sunday roasts at five of London's most beloved pubs to find out which one truly deserves the crown.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Food",
    readTime: 7,
    date: "April 10, 2023",
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Traditional British pub"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Discover the Best Pubs</h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Find authentic pubs with character and charm, from historic taverns to local favorites
          </p>
          <div className="w-full max-w-md relative">
            <GeoSearchInput
              placeholder="Search for pubs by name or location..."
              className="w-full h-12 bg-white/95 text-foreground"
            />
            <Button className="absolute right-1 top-1 h-10">Search</Button>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Top Rated Pubs */}
        <PubCarousel
          title="Top-rated Pubs"
          description="The highest-rated pubs you won't want to miss"
          pubs={topRatedPubs}
        />

        {/* Category Navigation */}
        <CategoryNav />

        {/* Random Pub Selection */}
        <section className="py-12 my-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Discover Something New</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Randomly select 4 pubs from the sample data */}
              {[...topRatedPubs]
                .sort(() => Math.random() - 0.5)
                .slice(0, 4)
                .map((pub) => (
                  <PubCard key={pub.id} pub={pub} />
                ))}
            </div>
          </div>
        </section>

        {/* Recent Blog Articles */}
        <section className="py-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">From Our Blog</h2>
            <Link href="/blog" className="text-primary hover:underline">
              View all articles
            </Link>
          </div>
          <div className="mb-8">
            <BlogCard post={recentBlogPosts[0]} featured={true} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBlogPosts.slice(1).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

