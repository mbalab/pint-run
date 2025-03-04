import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GeoSearchInput } from "@/components/geo-search-input"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#059669"
              strokeWidth="0"
              className="h-10 w-10"
            >
              <g fill="#059669">
                <path d="M7 3C6.44772 3 6 3.44772 6 4V5H5C4.44772 5 4 5.44772 4 6C4 6.55228 4.44772 7 5 7H6V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7H19C19.5523 7 20 6.55228 20 6C20 5.44772 19.5523 5 19 5H18V4C18 3.44772 17.5523 3 17 3H7Z" />
                <path d="M8 7H16V18C16 18.5523 15.5523 19 15 19H9C8.44772 19 8 18.5523 8 18V7Z" fill="white" />
                <path d="M9 8.5H15V16.5H9V8.5Z" fill="#059669" opacity="0.2" />
                <path d="M12 3H16V5H12V3Z" />
              </g>
            </svg>
            <span className="hidden font-playfair text-xl font-bold sm:inline-block">Pint Run</span>
          </Link>
        </div>
        <div className="flex-1 max-w-md mx-4">
          <GeoSearchInput placeholder="Search for pubs..." className="w-full bg-background md:w-[300px] lg:w-[400px]" />
        </div>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/blog" className="text-sm font-medium hover:text-primary">
            Blog
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
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
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </header>
  )
}

