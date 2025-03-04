import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { FilterSection } from "@/components/search/filter-section"

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

  const neighborhoods = ["Soho", "Covent Garden", "Southwark", "Hampstead", "Notting Hill", "Hammersmith", "Wapping"]

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg bg-card">
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        <FilterSection title="Pub Categories">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2 py-1">
              <Checkbox
                id={`category-${category}`}
                checked={activeFilters.categories.includes(category)}
                onCheckedChange={(checked) => onFilterChange("categories", category, checked === true)}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </FilterSection>

        <FilterSection title="Neighborhoods">
          {neighborhoods.map((neighborhood) => (
            <div key={neighborhood} className="flex items-center space-x-2 py-1">
              <Checkbox
                id={`neighborhood-${neighborhood}`}
                checked={activeFilters.neighborhood.includes(neighborhood)}
                onCheckedChange={(checked) => onFilterChange("neighborhood", neighborhood, checked === true)}
              />
              <label
                htmlFor={`neighborhood-${neighborhood}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {neighborhood}
              </label>
            </div>
          ))}
        </FilterSection>

        <FilterSection title="Features">
          {features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2 py-1">
              <Checkbox
                id={`feature-${feature}`}
                checked={activeFilters.features.includes(feature)}
                onCheckedChange={(checked) => onFilterChange("features", feature, checked === true)}
              />
              <label
                htmlFor={`feature-${feature}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {feature}
              </label>
            </div>
          ))}
        </FilterSection>

        <FilterSection title="Atmosphere">
          {atmosphere.map((item) => (
            <div key={item} className="flex items-center space-x-2 py-1">
              <Checkbox
                id={`atmosphere-${item}`}
                checked={activeFilters.atmosphere.includes(item)}
                onCheckedChange={(checked) => onFilterChange("atmosphere", item, checked === true)}
              />
              <label
                htmlFor={`atmosphere-${item}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item}
              </label>
            </div>
          ))}
        </FilterSection>

        <FilterSection title="Price Range">
          {priceRange.map((price) => (
            <div key={price} className="flex items-center space-x-2 py-1">
              <Checkbox
                id={`price-${price}`}
                checked={activeFilters.priceRange.includes(price)}
                onCheckedChange={(checked) => onFilterChange("priceRange", price, checked === true)}
              />
              <label
                htmlFor={`price-${price}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {price === "£" && "£ (Budget)"}
                {price === "££" && "££ (Mid-range)"}
                {price === "£££" && "£££ (High-end)"}
              </label>
            </div>
          ))}
        </FilterSection>

        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full" onClick={onResetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  )
}

