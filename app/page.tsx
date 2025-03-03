import CountrySelector from "@/components/country-selector"
import FeaturedPubs from "@/components/featured-pubs"
import SearchBar from "@/components/search-bar"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import PubCategories from "@/components/pub-categories"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero section with search */}
        <section className="relative bg-primary/5 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Discover the Best Pubs in the UK
                  </h1>
                  <p className="text-muted-foreground md:text-xl">
                    Find top-rated pubs, explore new neighborhoods, and discover hidden gems
                  </p>
                </div>
                <div className="w-full max-w-md">
                  <SearchBar />
                </div>
              </div>
              <div className="mx-auto w-full max-w-sm lg:max-w-none overflow-hidden rounded-xl">
                <CountrySelector />
              </div>
            </div>
          </div>
        </section>

        {/* Featured categories */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Browse by Category</h2>
            <PubCategories />
          </div>
        </section>

        {/* Featured pubs */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Featured Pubs</h2>
            <FeaturedPubs />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

