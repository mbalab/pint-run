"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FilterCategoryProps {
  options: {
    id: string
    label: string
  }[]
  activeFilters: string[]
  onFilterChange: (filters: string[]) => void
}

export function FilterCategory({ options, activeFilters, onFilterChange }: FilterCategoryProps) {
  const toggleFilter = (filterId: string) => {
    if (activeFilters.includes(filterId)) {
      onFilterChange(activeFilters.filter((id) => id !== filterId))
    } else {
      onFilterChange([...activeFilters, filterId])
    }
  }

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox
            id={option.id}
            checked={activeFilters.includes(option.id)}
            onCheckedChange={() => toggleFilter(option.id)}
          />
          <Label
            htmlFor={option.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  )
}

