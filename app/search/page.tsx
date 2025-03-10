"use client"

import { useState, useEffect, Fragment } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Filter, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { FilterPanel } from "@/components/search/filter-panel"
import { AdPlaceholder } from "@/components/ads/AdPlaceholder"
import { shouldRenderAd } from "@/lib/utils/ads"
import { PubCard } from "@/components/pub/pub-card" // Import PubCard component

// Sample data - in a real app, this would come from an API or database
const allPubs = [
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
    features: ["Beer Garden", "Real Ales", "Sunday Roast", "Fireplace"],
    priceRange: "££",
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
    features: ["Live Music", "Real Ales", "Food Served"],
    priceRange: "££",
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
    features: ["Beer Garden", "Real Ales", "Food Served", "WiFi"],
    priceRange: "£££",
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
    features: ["Live Music", "Real Ales", "Food Served"],
    priceRange: "££",
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
    features: ["Dog Friendly", "Sunday Roast", "Beer Garden", "Fireplace"],
    priceRange: "£££",
  },
  {
    id: "6",
    name: "The Churchill Arms",
    slug: "the-churchill-arms",
    image: "/placeholder.svg?height=300&width=500",
    location: {
      neighborhood: "Notting Hill",
      city: "london",
      country: "uk",
    },
    rating: 8.8,
    primaryCategory: "Lively Pubs",
    localsTouristsValue: 80,
    features: ["Food Served", "Beer Garden", "Real Ales", "WiFi"],
    priceRange: "££",
  },
  {
    id: "7",
    name: "The Dove",
    slug: "the-dove",
    image: "/placeholder.svg?height=300&width=500",
    location: {
      neighborhood: "Hammersmith",
      city: "london",
      country: "uk",
    },
    rating: 8.6,
    primaryCategory: "Historical Pubs",
    localsTouristsValue: 45,
    features: ["Beer Garden", "Real Ales", "Food Served", "Outdoor Seating"],
    priceRange: "££",
  },
  {
    id: "8",
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
    features: ["Beer Garden", "Real Ales", "Food Served", "Outdoor Seating"],
    priceRange: "££",
  },
  {
    id: "9",
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
    localsTouristsValue: 65,
    features: ["Beer Garden", "Real Ales", "Food Served", "Outdoor Seating"],
    priceRange: "££",
  },
  {
    id: "10",
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
    features: ["Beer Garden", "Real Ales", "Food Served"],
    priceRange: "££",
  },
]

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const [filteredPubs, setFilteredPubs] = useState(allPubs)
  const [activeFilters, setActiveFilters] = useState<{
    categories: string[]
    features: string[]
    pubVibe: string[]
    priceRange: string[]
  }>({
    categories: [],
    features: [],
    pubVibe: [],
    priceRange: [],
  })

  const [mapView, setMapView] = useState(false)
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [radius, setRadius] = useState(1)

  // Function to toggle filter panel on mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  // Function to reset all filters
  const resetFilters = () => {
    setActiveFilters({
      categories: [],
      features: [],
      pubVibe: [],
      priceRange: [],
    })

    // Update URL to remove all filter parameters
    router.push("/search")
  }

  // Function to handle filter changes
  const handleFilterChange = (
    filterType: "categories" | "features" | "pubVibe" | "priceRange",
    value: string,
    isChecked: boolean,
  ) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev }
      if (isChecked) {
        newFilters[filterType] = [...prev[filterType], value]
      } else {
        newFilters[filterType] = prev[filterType].filter((item) => item !== value)
      }
      return newFilters
    })
  }

  // Handle View on Map button click
  const handleViewOnMap = () => {
    // If map is already visible, hide it
    if (mapView) {
      setMapView(false)

      // Update URL to remove map parameters but keep other filters
      const params = new URLSearchParams(searchParams.toString())
      params.delete("view")
      params.delete("lat")
      params.delete("lng")
      params.delete("radius")

      if (params.toString()) {
        router.push(`/search?${params.toString()}`)
      } else {
        router.push("/search")
      }
      return
    }

    // If map is not visible, show it with geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setMapView(true)
          setLat(latitude)
          setLng(longitude)
          setRadius(1)

          // Preserve existing search parameters when adding map view
          const params = new URLSearchParams(searchParams.toString())
          params.set("view", "map")
          params.set("lat", latitude.toString())
          params.set("lng", longitude.toString())
          params.set("radius", "1")

          router.push(`/search?${params.toString()}`)
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Unable to get your location. Please try again or allow location access in your browser settings.")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }

  // Apply filters to pubs
  useEffect(() => {
    let result = allPubs

    // Filter by categories
    if (activeFilters.categories.length > 0) {
      result = result.filter((pub) => activeFilters.categories.includes(pub.primaryCategory))
    }

    // Filter by features
    if (activeFilters.features.length > 0) {
      result = result.filter((pub) => activeFilters.features.some((feature) => pub.features.includes(feature)))
    }

    // Filter by pub vibe (locals vs tourists)
    if (activeFilters.pubVibe.length > 0) {
      result = result.filter((pub) => {
        if (activeFilters.pubVibe.includes("Local Favorite") && pub.localsTouristsValue <= 35) {
          return true
        }
        if (
          activeFilters.pubVibe.includes("Mixed Crowd") &&
          pub.localsTouristsValue > 35 &&
          pub.localsTouristsValue < 65
        ) {
          return true
        }
        if (activeFilters.pubVibe.includes("Tourist Friendly") && pub.localsTouristsValue >= 65) {
          return true
        }
        return false
      })
    }

    // Filter by price range
    if (activeFilters.priceRange.length > 0) {
      result = result.filter((pub) => activeFilters.priceRange.includes(pub.priceRange))
    }

    setFilteredPubs(result)

    // Update URL with filter parameters
    const params = new URLSearchParams(searchParams.toString())

    if (activeFilters.categories.length === 1) {
      params.set("category", activeFilters.categories[0])
    } else {
      params.delete("category")
    }

    // Only update URL if we have filters to add and we're not in map view
    if (!mapView) {
      if (params.toString()) {
        router.push(`/search?${params.toString()}`)
      } else if (searchParams.toString() && !searchParams.has("view")) {
        // If we had filters but now they're all cleared, remove params from URL
        router.push("/search")
      }
    }
  }, [activeFilters, router, searchParams, mapView])

  // Read URL parameters on initial load
  useEffect(() => {
    const category = searchParams.get("category")
    const view = searchParams.get("view")
    const latParam = searchParams.get("lat")
    const lngParam = searchParams.get("lng")
    const radiusParam = searchParams.get("radius")

    // Set map view state
    setMapView(view === "map")
    if (latParam && lngParam) {
      setLat(Number.parseFloat(latParam))
      setLng(Number.parseFloat(lngParam))
      setRadius(radiusParam ? Number.parseFloat(radiusParam) : 1)
    }

    const initialFilters = {
      categories: category ? [category] : [],
      features: [],
      pubVibe: [],
      priceRange: [],
    }

    // Only set filters if we have parameters
    if (category) {
      setActiveFilters(initialFilters)
    }
  }, [searchParams])

  // Generate breadcrumb items based on active filters
  const getBreadcrumbItems = () => {
    const items = [{ label: "Search Results", href: "/search" }]

    if (activeFilters.categories.length === 1) {
      items.push({
        label: activeFilters.categories[0],
        href: `/search?category=${encodeURIComponent(activeFilters.categories[0])}`,
      })
    }

    if (mapView) {
      items.push({
        label: "Map View",
        href: `/search?view=map&lat=${lat}&lng=${lng}&radius=${radius}`,
      })
    }

    return items
  }

  // Custom PubGrid with ad placeholders
  const PubGridWithAds = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPubs.map((pub, index) => (
          <Fragment key={pub.id}>
            <div>
              {/* Assuming PubCard component exists */}
              <PubCard pub={pub} />
            </div>

            {/* Insert ad after the 4th pub */}
            {index === 3 && (
              <div className="col-span-full my-8">
                {/* AD PLACEHOLDER: Search-AfterFourthPub */}
                <AdPlaceholder id="search-after-fourth" format="horizontal" />
              </div>
            )}

            {/* Insert ad after every 8 pubs (excluding the first ad after the 4th pub) */}
            {index > 4 && shouldRenderAd(index - 4, 8) && (
              <div className="col-span-full my-8">
                {/* AD PLACEHOLDER: Search-Recurring */}
                <AdPlaceholder id={`search-recurring-${Math.floor((index - 4) / 8)}`} format="horizontal" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className="container py-6">
      <Breadcrumb items={getBreadcrumbItems()} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <Button variant="outline" className="md:hidden flex items-center gap-2" onClick={toggleFilter}>
          <Filter className="h-4 w-4" />
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Panel - Hidden on mobile when isFilterOpen is false */}
        <div className={`${isFilterOpen ? "block" : "hidden"} md:block w-full md:w-64 flex-shrink-0`}>
          <FilterPanel
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-muted-foreground">
              {filteredPubs.length} {filteredPubs.length === 1 ? "pub" : "pubs"} found
            </p>
            <Button className="flex items-center gap-2" onClick={handleViewOnMap}>
              {mapView ? (
                <>
                  <X className="h-4 w-4" />
                  Close Map View
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4" />
                  View on Map
                </>
              )}
            </Button>
          </div>

          {/* Active Filters Display */}
          {(activeFilters.categories.length > 0 ||
            activeFilters.features.length > 0 ||
            activeFilters.pubVibe.length > 0 ||
            activeFilters.priceRange.length > 0) && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {activeFilters.categories.map((filter) => (
                  <div
                    key={filter}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {filter}
                    <button
                      onClick={() => handleFilterChange("categories", filter, false)}
                      aria-label={`Remove ${filter} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {activeFilters.features.map((filter) => (
                  <div
                    key={filter}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {filter}
                    <button
                      onClick={() => handleFilterChange("features", filter, false)}
                      aria-label={`Remove ${filter} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {activeFilters.pubVibe.map((filter) => (
                  <div
                    key={filter}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {filter}
                    <button
                      onClick={() => handleFilterChange("pubVibe", filter, false)}
                      aria-label={`Remove ${filter} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {activeFilters.priceRange.map((filter) => (
                  <div
                    key={filter}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {filter}
                    <button
                      onClick={() => handleFilterChange("priceRange", filter, false)}
                      aria-label={`Remove ${filter} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <button onClick={resetFilters} className="text-sm text-muted-foreground hover:text-foreground">
                  Clear all
                </button>
              </div>
            </div>
          )}

          {mapView && lat && lng ? (
            <div className="w-full h-[600px] bg-muted rounded-lg relative mb-6">
              <div className="absolute inset-0 flex items-center justify-center flex-col p-4 text-center">
                <h3 className="text-lg font-medium mb-2">Map View</h3>
                <p className="text-muted-foreground mb-4">
                  Showing pubs within {radius} mile{radius !== 1 ? "s" : ""} of your location
                </p>
                <p className="text-sm text-muted-foreground">
                  Coordinates: {lat.toFixed(6)}, {lng.toFixed(6)}
                </p>
                <div className="mt-8 w-full max-w-md">
                  <div className="h-8 w-full bg-primary/20 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-primary rounded-full absolute left-0 top-0"
                      style={{ width: "60%" }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                      Loading map data...
                    </div>
                  </div>
                </div>
                {/* In a real implementation, you would integrate a map library like Google Maps, Mapbox, or Leaflet here */}
              </div>
            </div>
          ) : null}

          {/* Results Grid with Ads */}
          {filteredPubs.length > 0 ? (
            <PubGridWithAds />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No pubs found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters to find more pubs.</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

