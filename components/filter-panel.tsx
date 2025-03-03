"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { SlidersHorizontal, RotateCcw, HelpCircle } from "lucide-react"
import { FilterCategory } from "./filter-category"

const filterCategories = [
  {
    id: "atmosphere",
    title: "Atmosphere",
    tooltip: "Filter pubs based on their ambiance, style, and popularity",
    options: [
      { id: "historic", label: "Historic" },
      { id: "traditional", label: "Traditional" },
      { id: "modern", label: "Modern" },
      { id: "local-favorite", label: "Local Favorite" },
      { id: "tourist-attraction", label: "Tourist Attraction" },
    ],
  },
  {
    id: "offerings",
    title: "Offerings",
    tooltip: "Find pubs based on their drinks, food, and entertainment",
    options: [
      { id: "real-ale", label: "Real Ale" },
      { id: "craft-beer", label: "Craft Beer" },
      { id: "cider-selection", label: "Cider Selection" },
      { id: "food-served", label: "Food Served" },
      { id: "sunday-roast", label: "Sunday Roast" },
      { id: "gastropub", label: "Gastropub" },
      { id: "live-music", label: "Live Music" },
    ],
  },
  {
    id: "features",
    title: "Features",
    tooltip: "Additional amenities and accessibility options",
    options: [
      { id: "dog-friendly", label: "Dog Friendly" },
      { id: "garden", label: "Garden" },
      { id: "family-friendly", label: "Family Friendly" },
      { id: "sports-viewing", label: "Sports Viewing" },
      { id: "quiz-nights", label: "Quiz Nights" },
      { id: "wheelchair-access", label: "Wheelchair Access" },
    ],
  },
]

const locations = [
  { id: "england", label: "England" },
  { id: "scotland", label: "Scotland" },
  { id: "wales", label: "Wales" },
  { id: "northern-ireland", label: "Northern Ireland" },
]

const priceRanges = [
  { value: "budget", label: "Budget (£)" },
  { value: "mid-range", label: "Mid-range (££)" },
  { value: "high-end", label: "High-end (£££)" },
]

export function FilterPanel() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [rating, setRating] = React.useState([7])
  const [priceRange, setPriceRange] = React.useState("mid-range")
  const [activeFilters, setActiveFilters] = React.useState<string[]>([])

  const handleReset = () => {
    setRating([7])
    setPriceRange("mid-range")
    setActiveFilters([])
  }

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-20 p-6 bg-card rounded-lg border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            {(activeFilters.length > 0 || rating[0] !== 7 || priceRange !== "mid-range") && (
              <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 text-sm">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {filterCategories.map((category) => (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{category.title}</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">{category.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FilterCategory
                  options={category.options}
                  activeFilters={activeFilters}
                  onFilterChange={setActiveFilters}
                />
                <Separator />
              </div>
            ))}

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">Price Range</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Filter pubs by their price level</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <RadioGroup value={priceRange} onValueChange={setPriceRange} className="flex flex-col space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={range.value} id={range.value} />
                    <Label htmlFor={range.value}>{range.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              <Separator />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">Minimum Rating</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Filter pubs by their minimum rating out of 10</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="px-2">
                <Slider
                  value={rating}
                  onValueChange={setRating}
                  max={10}
                  step={0.5}
                  className="[&_[role=slider]]:bg-primary"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">0</span>
                  <span className="text-sm font-medium">{rating[0]}</span>
                  <span className="text-sm text-muted-foreground">10</span>
                </div>
              </div>
              <Separator />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">Location</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Filter pubs by country</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <FilterCategory options={locations} activeFilters={activeFilters} onFilterChange={setActiveFilters} />
            </div>

            <Button className="w-full bg-[#1E5631] hover:bg-[#1E5631]/90">Apply Filters</Button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {(activeFilters.length > 0 || rating[0] !== 7 || priceRange !== "mid-range") && (
                <span className="ml-2 rounded-full bg-primary w-6 h-6 flex items-center justify-center text-xs text-primary-foreground">
                  {activeFilters.length + (rating[0] !== 7 ? 1 : 0) + (priceRange !== "mid-range" ? 1 : 0)}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {filterCategories.map((category) => (
                <div key={category.id} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium">{category.title}</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">{category.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FilterCategory
                    options={category.options}
                    activeFilters={activeFilters}
                    onFilterChange={setActiveFilters}
                  />
                  <Separator />
                </div>
              ))}

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Filter pubs by their price level</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <RadioGroup value={priceRange} onValueChange={setPriceRange} className="flex flex-col space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={range.value} id={range.value} />
                      <Label htmlFor={range.value}>{range.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <Separator />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">Minimum Rating</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Filter pubs by their minimum rating out of 10</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="px-2">
                  <Slider
                    value={rating}
                    onValueChange={setRating}
                    max={10}
                    step={0.5}
                    className="[&_[role=slider]]:bg-primary"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-muted-foreground">0</span>
                    <span className="text-sm font-medium">{rating[0]}</span>
                    <span className="text-sm text-muted-foreground">10</span>
                  </div>
                </div>
                <Separator />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">Location</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Filter pubs by country</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FilterCategory options={locations} activeFilters={activeFilters} onFilterChange={setActiveFilters} />
              </div>

              <Button className="w-full" onClick={() => setIsOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

