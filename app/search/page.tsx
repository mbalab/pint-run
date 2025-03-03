import { Suspense } from "react"
import { DataManager } from "@/lib/data-manager"
import { SearchResults } from "@/components/search-results"
import SearchHeader from "@/components/search-header"
import { FilterProvider } from "@/context/filter-context"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchPageProps {
  searchParams: {
    q?: string
    region?: string
    features?: string[]
    minRating?: string
    page?: string
  }
}

// Server Component for fetching initial data
async function InitialSearchResults({
  query,
  region,
  features,
  minRating,
  page = "1",
}: {
  query?: string
  region?: string
  features?: string[]
  minRating?: string
  page?: string
}) {
  const dataManager = await DataManager.getInstance()
  const pubs = await dataManager.searchPubs(query || "", {
    region,
    features,
    minRating: minRating ? Number.parseFloat(minRating) : undefined,
    offset: (Number.parseInt(page) - 1) * 20,
  })

  // Pass the initial data to the client component
  return <SearchResults initialPubs={pubs} />
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { q, region, features, minRating, page } = searchParams

  return (
    <div className="min-h-screen flex flex-col">
      <SearchHeader query={q} />
      <main className="flex-1 container py-8">
        <FilterProvider>
          <Suspense fallback={<SearchResultsSkeleton />}>
            <InitialSearchResults
              query={q}
              region={region}
              features={Array.isArray(features) ? features : features ? [features] : undefined}
              minRating={minRating}
              page={page}
            />
          </Suspense>
        </FilterProvider>
      </main>
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-48 w-full" />
      ))}
    </div>
  )
}

