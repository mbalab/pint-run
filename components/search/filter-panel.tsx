"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface FilterPanelProps {
  activeFilters: {
    categories: string[]
    features: string[]
    atmosphere: string[]
    priceRange: string[]
    neighborhood: string[]
  }
  onFilterChange: (
    filterType: "categories" | "features" | "atmosphere" | "priceRange" | "neighborhood",
    value: string,
    isChecked: boolean,
  ) => void
  onResetFilters: () => void
}

export function FilterPanel({ activeFilters, onFilterChange, onResetFilters }: FilterPanelProps) {
  // State to track which sections are open
  const [openSections, setOpenSections] = useState({
    categories: true,
    features: true,
    atmosphere: true,
    priceRange: true,
  })

  // Toggle section open/closed
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Filter data
  const categories = [
    "Historical Pubs",
    "Best Ales",
    "Sunday Roasts",
    "Sports Pubs",
    "Lively Pubs",
    "Quiet Pubs",
    "Family-Friendly",
  ]

  const features = [
    "Beer Garden",
    "Live Music",
    "Real Ales",
    "Sunday Roast",
    "Dog Friendly",
    "Fireplace",
    "Outdoor Seating",
    "WiFi",
    "Food Served",
  ]

  const atmosphere = ["Local Favorite", "Tourist Friendly"]

  const priceRange = ["£", "££", "£££"]

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg bg-card shadow-sm">
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        {/* Categories Section */}
        <div className="py-3 border-b">
          <button
            className="flex w-full items-center justify-between py-2 text-left font-medium"
            onClick={() => toggleSection("categories")}
            aria-expanded={openSections.categories}
          >
            Pub Categories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                openSections.categories ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {openSections.categories && (
            <div className="mt-2 space-y-1 pl-1">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2 py-1.5">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={activeFilters.categories.includes(category)}
                    onChange={(e) => onFilterChange("categories", category, e.target.checked)}
                    className="h-4 w-4 rounded-sm border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`category-${category}`} className="text-sm font-medium leading-none cursor-pointer">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="py-3 border-b">
          <button
            className="flex w-full items-center justify-between py-2 text-left font-medium"
            onClick={() => toggleSection("features")}
            aria-expanded={openSections.features}
          >
            Features
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                openSections.features ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {openSections.features && (
            <div className="mt-2 space-y-1 pl-1">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2 py-1.5">
                  <input
                    type="checkbox"
                    id={`feature-${feature}`}
                    checked={activeFilters.features.includes(feature)}
                    onChange={(e) => onFilterChange("features", feature, e.target.checked)}
                    className="h-4 w-4 rounded-sm border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`feature-${feature}`} className="text-sm font-medium leading-none cursor-pointer">
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Atmosphere Section */}
        <div className="py-3 border-b">
          <button
            className="flex w-full items-center justify-between py-2 text-left font-medium"
            onClick={() => toggleSection("atmosphere")}
            aria-expanded={openSections.atmosphere}
          >
            Atmosphere
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                openSections.atmosphere ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {openSections.atmosphere && (
            <div className="mt-2 space-y-1 pl-1">
              {atmosphere.map((item) => (
                <div key={item} className="flex items-center space-x-2 py-1.5">
                  <input
                    type="checkbox"
                    id={`atmosphere-${item}`}
                    checked={activeFilters.atmosphere.includes(item)}
                    onChange={(e) => onFilterChange("atmosphere", item, e.target.checked)}
                    className="h-4 w-4 rounded-sm border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`atmosphere-${item}`} className="text-sm font-medium leading-none cursor-pointer">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Section */}
        <div className="py-3 border-b">
          <button
            className="flex w-full items-center justify-between py-2 text-left font-medium"
            onClick={() => toggleSection("priceRange")}
            aria-expanded={openSections.priceRange}
          >
            Price Range
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                openSections.priceRange ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {openSections.priceRange && (
            <div className="mt-2 space-y-1 pl-1">
              {priceRange.map((price) => (
                <div key={price} className="flex items-center space-x-2 py-1.5">
                  <input
                    type="checkbox"
                    id={`price-${price}`}
                    checked={activeFilters.priceRange.includes(price)}
                    onChange={(e) => onFilterChange("priceRange", price, e.target.checked)}
                    className="h-4 w-4 rounded-sm border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`price-${price}`} className="text-sm font-medium leading-none cursor-pointer">
                    {price === "£" && "£ (Budget)"}
                    {price === "££" && "££ (Mid-range)"}
                    {price === "£££" && "£££ (High-end)"}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reset Filters Button */}
        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full hover:bg-primary/10" onClick={onResetFilters}>
            Reset All Filters
          </Button>
        </div>
      </div>
    </div>
  )
}

