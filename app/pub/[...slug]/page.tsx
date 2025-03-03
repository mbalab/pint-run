import type { Metadata } from "next"
import { Phone, Globe, Beer, Utensils, Music, Navigation2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { CompactPubHeader } from "@/components/compact-pub-header"
import { MiniRatings } from "@/components/mini-ratings"
import { KeyInfoGrid } from "@/components/key-info-grid"
import { CompactHours } from "@/components/compact-hours"
import { NearbyPubsScroll } from "@/components/nearby-pubs-scroll"

// Mock data function - would be replaced with actual data fetching
const getPubData = (slug: string[]) => {
  // In production, you would fetch this data based on the slug
  return {
    id: "pub1",
    name: "The Red Lion",
    slug: "the-red-lion",
    description:
      "A historic London pub dating back to 1720, The Red Lion offers a perfect blend of traditional British pub atmosphere with modern amenities.",
    history:
      "The Red Lion has been serving locals and visitors alike since the early 18th century. Originally built as a coaching inn, it has witnessed countless historical events and remained a constant presence in London's ever-changing landscape.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    address: {
      street: "23 Crown Street",
      city: "London",
      region: "England",
      postalCode: "W1D 3DH",
      country: "United Kingdom",
    },
    location: {
      lat: 51.5126,
      lng: -0.1347,
    },
    rating: {
      overall: 8.7,
      ambience: 9.0,
      service: 8.5,
      value: 8.2,
      selection: 9.1,
    },
    features: ["Real Ale", "Historic", "Food", "Live Music", "Outdoor Seating", "Dog Friendly"],
    openingHours: {
      monday: { hours: "11:00 - 23:00", busy: false },
      tuesday: { hours: "11:00 - 23:00", busy: false },
      wednesday: { hours: "11:00 - 23:00", busy: false },
      thursday: { hours: "11:00 - 23:00", busy: true },
      friday: { hours: "11:00 - 00:00", busy: true },
      saturday: { hours: "10:00 - 00:00", busy: true },
      sunday: { hours: "12:00 - 22:30", busy: true },
    },
    contact: {
      phone: "+44 20 7930 4141",
      email: "info@theredlion.co.uk",
      website: "https://www.theredlion.co.uk",
      reservations: "https://bookings.theredlion.co.uk",
    },
    quickInfo: [
      {
        icon: Beer,
        title: "Real Ales",
        description: "6 hand pumps featuring local and national ales",
      },
      {
        icon: Utensils,
        title: "Food Service",
        description: "Full menu daily, Sunday roast available",
      },
      {
        icon: Music,
        title: "Entertainment",
        description: "Live music every Friday and Saturday",
      },
    ],
    nearbyPubs: [
      {
        id: "the-crown",
        name: "The Crown",
        distance: "0.2 miles",
        rating: 8.3,
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "the-george",
        name: "The George",
        distance: "0.4 miles",
        rating: 8.9,
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
  }
}

export function generateMetadata({ params }: { params: { slug: string[] } }): Metadata {
  const pub = getPubData(params.slug)

  return {
    title: `${pub.name} - Pint.run`,
    description: pub.description,
  }
}

export default function PubPage({ params }: { params: { slug: string[] } }) {
  const pub = getPubData(params.slug)

  // Add referral parameter to external links
  const websiteUrl = pub.contact.website ? `${pub.contact.website}?ref=pint.run` : null
  const reservationsUrl = pub.contact.reservations ? `${pub.contact.reservations}?ref=pint.run` : null
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${pub.name}, ${pub.address.street}, ${pub.address.city}`,
  )}`

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <CompactPubHeader name={pub.name} features={pub.features} rating={pub.rating.overall} images={pub.images} />

        <div className="container px-4 py-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              {/* Ratings */}
              <Card>
                <CardContent className="p-4">
                  <MiniRatings
                    ratings={[
                      { label: "Ambience", value: pub.rating.ambience },
                      { label: "Service", value: pub.rating.service },
                      { label: "Value", value: pub.rating.value },
                      { label: "Selection", value: pub.rating.selection },
                    ]}
                  />
                </CardContent>
              </Card>

              {/* Key Info */}
              <KeyInfoGrid
                realAles={pub.quickInfo[0].description}
                foodService={pub.quickInfo[1].description}
                entertainment={pub.quickInfo[2].description}
              />

              {/* Description and History */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h2 className="font-medium mb-2">About</h2>
                    <p className="text-sm text-muted-foreground">{pub.description}</p>
                  </div>
                  <Separator />
                  <div>
                    <h2 className="font-medium mb-2">History</h2>
                    <p className="text-sm text-muted-foreground">{pub.history}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Opening Hours */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Opening Hours</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CompactHours hours={pub.openingHours} />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact and Location */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h2 className="font-medium">Location</h2>
                    <p className="text-sm text-muted-foreground">
                      {pub.address.street}
                      <br />
                      {pub.address.city}, {pub.address.postalCode}
                    </p>
                    <Button className="w-full h-8 text-sm" asChild>
                      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                        <Navigation2 className="mr-2 h-4 w-4" />
                        Get Directions
                      </a>
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h2 className="font-medium">Contact</h2>
                    <div className="grid gap-2">
                      {pub.contact.phone && (
                        <Button variant="outline" className="h-8 text-sm" asChild>
                          <a href={`tel:${pub.contact.phone}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            {pub.contact.phone}
                          </a>
                        </Button>
                      )}
                      {websiteUrl && (
                        <Button variant="outline" className="h-8 text-sm" asChild>
                          <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                            <Globe className="mr-2 h-4 w-4" />
                            Visit Website
                          </a>
                        </Button>
                      )}
                      {reservationsUrl && (
                        <Button className="h-8 text-sm bg-[#1E5631] hover:bg-[#1E5631]/90" asChild>
                          <a href={reservationsUrl} target="_blank" rel="noopener noreferrer">
                            Book a Table
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nearby pubs */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Nearby Pubs</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <NearbyPubsScroll pubs={pub.nearbyPubs} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

