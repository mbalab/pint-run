import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import SearchBar from "@/components/search-bar"
import FeaturedPubs from "@/components/featured-pubs"

// This would be replaced with data fetching in a production app
const getCountryData = (country: string) => {
  const countries = {
    england: {
      name: "England",
      image: "/placeholder.svg?height=600&width=1200",
      description: "Explore England's rich pub culture, from historic London taverns to charming countryside inns.",
      pubCount: 32450,
      regions: [
        { name: "London", slug: "london", pubCount: 3500 },
        { name: "South East", slug: "south-east", pubCount: 5600 },
        { name: "South West", slug: "south-west", pubCount: 4200 },
        { name: "Midlands", slug: "midlands", pubCount: 6100 },
        { name: "North West", slug: "north-west", pubCount: 5300 },
        { name: "North East", slug: "north-east", pubCount: 3200 },
        { name: "Yorkshire", slug: "yorkshire", pubCount: 4550 },
      ],
    },
    scotland: {
      name: "Scotland",
      image: "/placeholder.svg?height=600&width=1200",
      description: "Discover Scotland's welcoming pubs, from Edinburgh's historic taverns to highland gems.",
      pubCount: 4120,
      regions: [
        { name: "Edinburgh", slug: "edinburgh", pubCount: 520 },
        { name: "Glasgow", slug: "glasgow", pubCount: 580 },
        { name: "Highlands", slug: "highlands", pubCount: 430 },
        { name: "Islands", slug: "islands", pubCount: 210 },
        { name: "Central", slug: "central", pubCount: 380 },
      ],
    },
    wales: {
      name: "Wales",
      image: "/placeholder.svg?height=600&width=1200",
      description: "Explore Wales' charming pubs offering warm Welsh hospitality and local brews.",
      pubCount: 3540,
      regions: [
        { name: "Cardiff", slug: "cardiff", pubCount: 380 },
        { name: "North Wales", slug: "north-wales", pubCount: 720 },
        { name: "South Wales", slug: "south-wales", pubCount: 850 },
        { name: "Mid Wales", slug: "mid-wales", pubCount: 590 },
      ],
    },
    "northern-ireland": {
      name: "Northern Ireland",
      image: "/placeholder.svg?height=600&width=1200",
      description: "Discover Northern Ireland's vibrant pub scene, from Belfast's historic bars to coastal gems.",
      pubCount: 1280,
      regions: [
        { name: "Belfast", slug: "belfast", pubCount: 320 },
        { name: "County Antrim", slug: "county-antrim", pubCount: 240 },
        { name: "County Down", slug: "county-down", pubCount: 210 },
        { name: "County Tyrone", slug: "county-tyrone", pubCount: 180 },
        { name: "County Armagh", slug: "county-armagh", pubCount: 170 },
        { name: "County Londonderry", slug: "county-londonderry", pubCount: 160 },
      ],
    },
  }

  return countries[country as keyof typeof countries] || null
}

export function generateMetadata({ params }: { params: { country: string } }): Metadata {
  const countryData = getCountryData(params.country)

  if (!countryData) {
    return {
      title: "Country Not Found - Pint.run",
      description: "Discover great pubs across the UK with Pint.run",
    }
  }

  return {
    title: `${countryData.name} Pubs - Pint.run`,
    description: countryData.description,
  }
}

export default function CountryPage({ params }: { params: { country: string } }) {
  const countryData = getCountryData(params.country)

  if (!countryData) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Country Not Found</h1>
            <p className="mb-6">Sorry, we couldn't find the country you're looking for.</p>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero section with search */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src={countryData.image || "/placeholder.svg"}
              alt={countryData.name}
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="relative z-10 py-20 md:py-32">
            <div className="container px-4 md:px-6 text-white">
              <div className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                  {countryData.name} Pubs
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-6">{countryData.description}</p>
                <div className="max-w-md">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regions section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Explore {countryData.name} by Region</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {countryData.regions.map((region) => (
                <Link key={region.slug} href={`/${params.country}/${region.slug}`}>
                  <Card className="h-full transition-all hover:shadow-md">
                    <CardContent className="p-4">
                      <h3 className="font-medium">{region.name}</h3>
                      <p className="text-sm text-muted-foreground">{region.pubCount} pubs</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured pubs in country */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Top Pubs in {countryData.name}</h2>
            <FeaturedPubs />
          </div>
        </section>

        {/* JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "LocalBusiness",
                    name: "The Red Lion",
                    image: "/placeholder.svg?height=300&width=400",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "London",
                      addressRegion: "England",
                      addressCountry: "United Kingdom",
                    },
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: "8.7",
                      bestRating: "10",
                      ratingCount: "142",
                    },
                  },
                },
                // Additional items would be added here
              ],
            }),
          }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}

