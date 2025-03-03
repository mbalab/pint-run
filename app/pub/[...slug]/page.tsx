import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DataManager } from "@/lib/data-manager"
import { CompactPubHeader } from "@/components/compact-pub-header"
import { MiniRatings } from "@/components/mini-ratings"
import { KeyInfoGrid } from "@/components/key-info-grid"
import { CompactHours } from "@/components/compact-hours"
import { NearbyPubsScroll } from "@/components/nearby-pubs-scroll"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

interface PubPageProps {
  params: {
    slug: string[]
  }
}

async function getPubData(slug: string[]) {
  const dataManager = await DataManager.getInstance()
  const pubId = slug.join("-")
  return dataManager.getPub(pubId)
}

export async function generateMetadata({ params }: PubPageProps): Promise<Metadata> {
  const pub = await getPubData(params.slug)

  if (!pub) {
    return {
      title: "Pub Not Found - Pint.run",
      description: "The requested pub could not be found.",
    }
  }

  return {
    title: `${pub.name} - Pint.run`,
    description: pub.description,
    openGraph: {
      title: pub.name,
      description: pub.description,
      images: [pub.images.primary],
    },
  }
}

export default async function PubPage({ params }: PubPageProps) {
  const pub = await getPubData(params.slug)

  if (!pub) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <CompactPubHeader
          name={pub.name}
          features={pub.features}
          rating={pub.rating.overall}
          images={[pub.images.primary, ...pub.images.gallery]}
        />

        <div className="container px-4 py-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              <MiniRatings
                ratings={[
                  { label: "Atmosphere", value: pub.rating.atmosphere },
                  { label: "Service", value: pub.rating.service },
                  { label: "Value", value: pub.rating.value },
                  { label: "Selection", value: pub.rating.selection },
                ]}
              />

              <KeyInfoGrid
                realAles="Selection of local ales"
                foodService={pub.features.includes("Food") ? "Full menu available" : "No food service"}
                entertainment={pub.features.includes("Live Music") ? "Live music events" : "No entertainment"}
              />

              <CompactHours hours={pub.openingHours} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <NearbyPubsScroll currentPubId={pub.id} coordinates={pub.coordinates} />
            </div>
          </div>
        </div>

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: pub.name,
              description: pub.description,
              address: {
                "@type": "PostalAddress",
                streetAddress: pub.address.street,
                addressLocality: pub.address.city,
                postalCode: pub.address.postalCode,
                addressCountry: "GB",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: pub.coordinates.lat,
                longitude: pub.coordinates.lng,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: pub.rating.overall,
                reviewCount: pub.rating.count,
              },
              image: pub.images.primary,
              telephone: pub.contact.phone,
              url: pub.contact.website,
            }),
          }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}

