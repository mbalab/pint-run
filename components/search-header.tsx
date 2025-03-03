import Link from "next/link"
import { Beer, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/search-bar"

const countries = [
  { name: "England", href: "/england" },
  { name: "Scotland", href: "/scotland" },
  { name: "Wales", href: "/wales" },
  { name: "Northern Ireland", href: "/northern-ireland" },
]

export default function SearchHeader({ query }: { query?: string }) {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center space-x-2">
            <Beer className="h-6 w-6" />
            <span className="text-xl font-bold">Pint.run</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            {countries.map((country) => (
              <Link
                key={country.name}
                href={country.href}
                className="text-sm font-medium hover:text-primary-foreground/80"
              >
                {country.name}
              </Link>
            ))}
            <Link href="/about" className="text-sm font-medium hover:text-primary-foreground/80">
              About
            </Link>
          </nav>
          <Button variant="secondary" size="icon" className="md:hidden" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">{query ? `Search results for "${query}"` : "Search Pubs"}</h1>
          <SearchBar />
        </div>
      </div>
    </header>
  )
}

