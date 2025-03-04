import Image from "next/image"
import type { Metadata } from "next"
import { MapPin, Phone, Globe, Clock, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { RatingBadge } from "@/components/ui/rating-badge"
import { LocalsTouristsSlider } from "@/components/ui/locals-tourists-slider"
import { PubCard } from "@/components/pub/pub-card"
import { RatingBreakdown } from "@/components/pub/rating-breakdown"

interface PubPageProps {
  params: {
    country: string
    city: string
    slug: string
  }
}

// This would typically come from a database or API
const pubData = {
  "the-red-lion": {
    id: "1",
    name: "The Red Lion",
    slug: "the-red-lion",
    description:
      "A historic pub dating back to the 18th century, The Red Lion offers a traditional British pub experience with a modern twist. Known for its excellent selection of real ales and hearty pub food.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    location: {
      address: "48 Parliament Street",
      neighborhood: "Westminster",
      city: "London",
      country: "UK",
      postcode: "SW1A 2NH",
      coordinates: {
        lat: 51.5014,
        lng: -0.1268,
      },
    },
    contact: {
      phone: "+44 20 7930 5826",
      website: "https://example.com/theredlion",
    },
    hours: {
      monday: "11:00 - 23:00",
      tuesday: "11:00 - 23:00",
      wednesday: "11:00 - 23:00",
      thursday: "11:00 - 23:00",
      friday: "11:00 - 00:00",
      saturday: "11:00 - 00:00",
      sunday: "12:00 - 22:30",
    },
    ratings: {
      overall: 9.2,
      atmosphere: 9.5,
      drinks: 9.0,
      food: 8.8,
      history: 9.7,
      external: 9.0,
    },
    localsTouristsValue: 60,
    primaryCategory: "Historical Pubs",
    categories: ["Historical Pubs", "Best Ales", "Sunday Roasts"],
    highlights: [
      "Grade II listed building with original Victorian features",
      "Award-winning selection of real ales",
      "Famous for its traditional Sunday roast",
      "Regular live music events on weekends",
    ],
    menuHighlights: [
      {
        name: "London Pride",
        type: "Ale",
        description: "Fuller's flagship beer, a classic English ale with a distinctive malty base and earthy hops.",
      },
      {
        name: "Steak & Ale Pie",
        type: "Food",
        description:
          "Tender chunks of beef slow-cooked in ale, topped with a flaky pastry crust and served with seasonal vegetables.",
      },
      {
        name: "Fish & Chips",
        type: "Food",
        description: "Beer-battered cod with thick-cut chips, served with mushy peas and homemade tartar sauce.",
      },
    ],
    features: ["Beer Garden", "Live Music", "Real Ales", "Sunday Roast", "Dog Friendly", "Fireplace"],
    nearbyPubs: [
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
    ],
  },
  // Other pubs would be defined similarly
}

export async function generateMetadata({ params }: PubPageProps): Promise<Metadata> {
  const { slug } = params
  const pub = pubData[slug as keyof typeof pubData]

  if (!pub) {
    return {
      title: "Pub Not Found | Pint Run",
      description: "The requested pub could not be found.",
    }
  }

  return {
    title: `${pub.name} | Pint Run`,
    description: pub.description,
  }
}

export default function PubPage({ params }: PubPageProps) {
  const { country, city, slug } = params
  const pub = pubData[slug as keyof typeof pubData]

  if (!pub) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Pub Not Found</h1>
        <p>The requested pub could not be found.</p>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <Breadcrumb
        items={[
          { label: pub.location.country, href: `/${country}` },
          { label: pub.location.city, href: `/${country}/${city}` },
          { label: pub.name, href: `/${country}/${city}/${slug}` },
        ]}
      />

      <div className="py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              {pub.name}
              <RatingBadge rating={pub.ratings.overall} size="lg" />
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <MapPin className="h-4 w-4" />
              <span>
                {pub.location.address}, {pub.location.neighborhood}, {pub.location.city}
              </span>
            </div>
          </div>
          <Button size="lg" className="flex items-center gap-2">
            <Navigation className="h-4 w-4" />
            Get Directions
          </Button>
        </div>

        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-lg overflow-hidden mb-8">
          <Image src={pub.images[0] || "/placeholder.svg"} alt={pub.name} fill className="object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">About {pub.name}</h2>
              <p className="text-muted-foreground">{pub.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Rating Breakdown</h2>
              <RatingBreakdown ratings={pub.ratings} />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Locals vs. Tourists</h2>
              <div className="p-6 rounded-lg border bg-card">
                <LocalsTouristsSlider value={pub.localsTouristsValue} size="lg" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">What Makes It Special</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pub.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Menu Highlights</h2>
              <div className="space-y-4">
                {pub.menuHighlights.map((item, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{item.name}</h3>
                      <span className="text-sm px-2 py-0.5 bg-muted rounded-full">{item.type}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pub.images.map((image, index) => (
                  <div key={index} className="relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${pub.name} - Photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Location & Directions</h2>
              <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-4 bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Map would be displayed here</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Getting There</h3>
                <p className="text-muted-foreground mb-4">
                  The Red Lion is located in the heart of Westminster, just a short walk from Westminster tube station.
                  From the station, head east on Bridge Street, then turn right onto Parliament Street. The pub will be
                  on your right after about 200 meters.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-sm bg-muted px-3 py-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                      <path d="M12 3v6"></path>
                    </svg>
                    <span>Parking: Limited street parking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-muted px-3 py-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="8" rx="2"></rect>
                      <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"></path>
                    </svg>
                    <span>Tube: Westminster (5 min walk)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-muted px-3 py-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 6v6"></path>
                      <path d="M15 6v6"></path>
                      <path d="M2 12h19.6"></path>
                    </svg>
                    <span>Bus: Routes 11, 24, 88</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-lg border bg-card">
              <h2 className="text-xl font-bold mb-4">Key Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-sm text-muted-foreground">
                      {pub.location.address}
                      <br />
                      {pub.location.neighborhood}
                      <br />
                      {pub.location.city}, {pub.location.postcode}
                      <br />
                      {pub.location.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-muted-foreground">
                      <a href={`tel:${pub.contact.phone}`} className="hover:text-primary">
                        {pub.contact.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Website</h3>
                    <p className="text-sm text-muted-foreground">
                      <a
                        href={`${pub.contact.website}?ref=pint.run`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        Visit website
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Opening Hours</h3>
                    <div className="text-sm text-muted-foreground space-y-1 mt-1">
                      <div className="flex justify-between">
                        <span>Monday</span>
                        <span>{pub.hours.monday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tuesday</span>
                        <span>{pub.hours.tuesday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wednesday</span>
                        <span>{pub.hours.wednesday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thursday</span>
                        <span>{pub.hours.thursday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Friday</span>
                        <span>{pub.hours.friday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>{pub.hours.saturday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>{pub.hours.sunday}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Features</h2>
              <div className="flex flex-wrap gap-2">
                {pub.features.map((feature, index) => (
                  <span key={index} className="text-sm bg-muted px-3 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Similar Pubs Nearby</h2>
              <div className="space-y-4">
                {pub.nearbyPubs.map((nearbyPub) => (
                  <PubCard key={nearbyPub.id} pub={nearbyPub} size="sm" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

