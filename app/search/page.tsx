import { Suspense } from "react"
import type { Metadata } from "next"
import SearchResults from "@/components/search-results"
import SearchHeader from "@/components/search-header"
import { FilterProvider } from "@/context/filter-context"

export const metadata: Metadata = {
  title: "Search Results - Pint.run",
  description: "Find the perfect pub across the UK",
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SearchHeader query={searchParams.q} />
      <main className="flex-1 container py-8">
        <FilterProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <SearchResults initialQuery={searchParams.q} />
          </Suspense>
        </FilterProvider>
      </main>
    </div>
  )
}

