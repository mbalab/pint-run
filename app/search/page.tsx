"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Filter, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PubGrid } from "@/components/pub/pub-grid"
import { FilterPanel } from "@/components/search/filter-panel"

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
]

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const [filteredPubs, setFilteredPubs] = useState(allPubs)
  const [activeFilters, setActiveFilters] = useState<{
    categories: string[]
    features: string[]
    atmosphere: string[]
    priceRange: string[]
    neighborhood: string[]
  }>({
    categories: [],
    features: [],
    atmosphere: [],
    priceRange: [],
    neighborhood: [],
  })

  // Function to toggle filter panel on mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  // Function to reset all filters
  const resetFilters = () => {
    setActiveFilters({
      categories: [],
      features: [],
      atmosphere: [],
      priceRange: [],
      neighborhood: [],
    })

    // Update URL to remove all filter parameters
    router.push("/search")
  }

  // Function to handle filter changes
  const handleFilterChange = (
    filterType: "categories" | "features" | "atmosphere" | "priceRange" | "neighborhood",
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

    // Filter by atmosphere (locals vs tourists)
    if (activeFilters.atmosphere.includes("Local Favorite")) {
      result = result.filter((pub) => pub.localsTouristsValue <= 40)
    }
    if (activeFilters.atmosphere.includes("Tourist Friendly")) {
      result = result.filter((pub) => pub.localsTouristsValue >= 60)
    }

    // Filter by price range
    if (activeFilters.priceRange.length > 0) {
      result = result.filter((pub) => activeFilters.priceRange.includes(pub.priceRange))
    }

    // Filter by neighborhood
    if (activeFilters.neighborhood.length > 0) {
      result = result.filter((pub) => activeFilters.neighborhood.includes(pub.location.neighborhood))
    }

    setFilteredPubs(result)

    // Update URL with filter parameters
    const params = new URLSearchParams()

    if (activeFilters.categories.length === 1) {
      params.set("category", activeFilters.categories[0])
    }

    if (activeFilters.neighborhood.length === 1) {
      params.set("neighborhood", activeFilters.neighborhood[0])
    }

    // Only update URL if we have filters to add
    if (params.toString()) {
      router.push(`/search?${params.toString()}`)
    } else if (searchParams.toString()) {
      // If we had filters but now they're all cleared, remove params from URL
      router.push("/search")
    }
  }, [activeFilters, router, searchParams])

  // Read URL parameters on initial load
  useEffect(() => {
    const category = searchParams.get("category")
    const neighborhood = searchParams.get("neighborhood")

    const initialFilters = {
      categories: category ? [category] : [],
      features: [],
      atmosphere: [],
      priceRange: [],
      neighborhood: neighborhood ? [neighborhood] : [],
    }

    // Only set filters if we have parameters
    if (category || neighborhood) {
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

    if (activeFilters.neighborhood.length === 1) {
      items.push({
        label: activeFilters.neighborhood[0],
        href: `/search?neighborhood=${encodeURIComponent(activeFilters.neighborhood[0])}`,
      })
    }

    return items
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
            <Button className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              View on Map
            </Button>
          </div>

          {/* Active Filters Display */}
          {(activeFilters.categories.length > 0 ||
            activeFilters.features.length > 0 ||
            activeFilters.atmosphere.length > 0 ||
            activeFilters.priceRange.length > 0 ||
            activeFilters.neighborhood.length > 0) && (
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
                {activeFilters.atmosphere.map((filter) => (
                  <div
                    key={filter}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {filter}
                    <button
                      onClick={() => handleFilterChange("atmosphere", filter, false)}
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
                {activeFilters.neighborhood.map((filter) => (
                  <div
                    key={filter}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {filter}
                    <button
                      onClick={() => handleFilterChange("neighborhood", filter, false)}
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

          {/* Results Grid */}
          {filteredPubs.length > 0 ? (
            <PubGrid pubs={filteredPubs} />
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

