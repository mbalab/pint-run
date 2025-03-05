import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2 pr-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Pint Run" width={40} height={40} className="h-10 w-10" />
              <span className="font-playfair text-xl font-bold">Pint Run</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover the best pubs around the world with character, history, and atmosphere.
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-4 text-sm font-medium">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search?category=Historical%20Pubs" className="text-muted-foreground hover:text-foreground">
                  Historical Pubs
                </Link>
              </li>
              <li>
                <Link href="/search?category=Best%20Ales" className="text-muted-foreground hover:text-foreground">
                  Best Ales
                </Link>
              </li>
              <li>
                <Link href="/search?category=Sunday%20Roasts" className="text-muted-foreground hover:text-foreground">
                  Sunday Roasts
                </Link>
              </li>
              <li>
                <Link href="/search?category=Sports%20Pubs" className="text-muted-foreground hover:text-foreground">
                  Sports Pubs
                </Link>
              </li>
              <li>
                <Link href="/search?category=Lively%20Pubs" className="text-muted-foreground hover:text-foreground">
                  Lively Pubs
                </Link>
              </li>
              <li>
                <Link href="/search?category=Quiet%20Pubs" className="text-muted-foreground hover:text-foreground">
                  Quiet Pubs
                </Link>
              </li>
              <li>
                <Link href="/search?category=Family-Friendly" className="text-muted-foreground hover:text-foreground">
                  Family-Friendly
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Pint Run
                </Link>
              </li>
              <li>
                <Link href="/rating-system" className="text-muted-foreground hover:text-foreground">
                  Our Rating System
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Pint Run. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

