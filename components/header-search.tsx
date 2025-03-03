"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, MapPin, Beer, Calendar } from "lucide-react"
import type { SearchResult } from "@/types/search"

export default function HeaderSearch() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const router = useRouter()

  // Mock search results - in production, this would be fetched from an API
  const searchResults: SearchResult[] = [
    {
      id: "historic",
      type: "feature",
      title: "Historic Pubs",
      subtitle: "Traditional pubs with centuries of history",
      icon: "building",
    },
    {
      id: "sunday-roast",
      type: "feature",
      title: "Sunday Roast",
      subtitle: "Pubs famous for their Sunday roasts",
      icon: "utensils",
    },
    {
      id: "london",
      type: "location",
      title: "London",
      subtitle: "3,500+ pubs across the city",
      icon: "location",
    },
  ]

  const handleSelect = (result: SearchResult) => {
    setOpen(false)
    if (result.type === "location") {
      router.push(`/search?location=${result.id}`)
    } else if (result.type === "feature") {
      router.push(`/search?feature=${result.id}`)
    }
  }

  return (
    <div className="relative w-full min-w-[500px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background"
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 shrink-0 opacity-50" />
              <span className="text-muted-foreground">{query || "Find pubs by name, location, style..."}</span>
            </div>
            <SlidersHorizontal className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search pubs..." value={query} onValueChange={setQuery} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggested">
                {searchResults.map((result) => (
                  <CommandItem key={result.id} value={result.title} onSelect={() => handleSelect(result)}>
                    {result.type === "location" && <MapPin className="mr-2 h-4 w-4 text-primary" />}
                    {result.type === "feature" && result.id === "historic" && (
                      <Beer className="mr-2 h-4 w-4 text-primary" />
                    )}
                    {result.type === "feature" && result.id === "sunday-roast" && (
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                    )}
                    <div>
                      <div className="font-medium">{result.title}</div>
                      <div className="text-sm text-muted-foreground">{result.subtitle}</div>
                    </div>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {result.type}
                    </Badge>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

