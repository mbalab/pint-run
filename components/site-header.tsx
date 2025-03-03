"use client"
import Link from "next/link"
import { Beer } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import HeaderSearch from "./header-search"

interface Region {
  name: string
  slug: string
  pubCount: number
  subRegions?: Region[]
}

const regions: { name: string; regions: Region[] }[] = [
  {
    name: "England",
    regions: [
      {
        name: "London",
        slug: "london",
        pubCount: 3500,
        subRegions: [
          { name: "Central London", slug: "central-london", pubCount: 850 },
          { name: "East London", slug: "east-london", pubCount: 620 },
          { name: "West London", slug: "west-london", pubCount: 580 },
        ],
      },
      {
        name: "South East",
        slug: "south-east",
        pubCount: 5600,
        subRegions: [
          { name: "Kent", slug: "kent", pubCount: 1200 },
          { name: "Sussex", slug: "sussex", pubCount: 980 },
        ],
      },
    ],
  },
  {
    name: "Scotland",
    regions: [
      {
        name: "Edinburgh & Lothians",
        slug: "edinburgh-lothians",
        pubCount: 520,
      },
      {
        name: "Glasgow & Clyde",
        slug: "glasgow-clyde",
        pubCount: 580,
      },
    ],
  },
]

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center space-x-2">
          <Beer className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Pint.run</span>
        </Link>

        <div className="flex-1 flex justify-center max-w-3xl">
          <HeaderSearch />
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[500px]">
                  {regions.map((country) => (
                    <div key={country.name} className="space-y-3">
                      <h4 className="font-medium leading-none">{country.name}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {country.regions.map((region) => (
                          <NavigationMenuLink
                            key={region.slug}
                            asChild
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <Link href={`/${country.name.toLowerCase()}/${region.slug}`}>
                              <div className="text-sm font-medium leading-none">{region.name}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {region.pubCount} pubs
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  )}
                >
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}

