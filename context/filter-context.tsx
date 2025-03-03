"use client"

import * as React from "react"
import type { FilterState, FilterContextType } from "@/types/filters"

const initialState: FilterState = {
  atmosphere: [],
  quality: [],
  practical: [],
  audienceType: "all",
  priceRange: [0, 4],
  openNow: false,
}

export const FilterContext = React.createContext<FilterContextType>({
  filters: initialState,
  setFilters: () => null,
  resetFilters: () => null,
})

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = React.useState<FilterState>(initialState)

  const resetFilters = () => setFilters(initialState)

  return <FilterContext.Provider value={{ filters, setFilters, resetFilters }}>{children}</FilterContext.Provider>
}

export const useFilters = () => React.useContext(FilterContext)

