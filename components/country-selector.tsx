"use client"

import { Button } from "@/components/ui/button"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CountrySelector() {
  const countries = [
    {
      name: "England",
      slug: "england",
      image: "/placeholder.svg?height=300&width=400",
      pubCount: "32,450",
    },
    {
      name: "Scotland",
      slug: "scotland",
      image: "/placeholder.svg?height=300&width=400",
      pubCount: "4,120",
    },
    {
      name: "Wales",
      slug: "wales",
      image: "/placeholder.svg?height=300&width=400",
      pubCount: "3,540",
    },
    {
      name: "Northern Ireland",
      slug: "northern-ireland",
      image: "/placeholder.svg?height=300&width=400",
      pubCount: "1,280",
    },
  ]

  return (
    <Tabs defaultValue="england" className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="england">England</TabsTrigger>
        <TabsTrigger value="scotland">Scotland</TabsTrigger>
        <TabsTrigger value="wales">Wales</TabsTrigger>
        <TabsTrigger value="northern-ireland">N. Ireland</TabsTrigger>
      </TabsList>
      {countries.map((country) => (
        <TabsContent key={country.slug} value={country.slug} className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <Image
                  src={country.image || "/placeholder.svg"}
                  alt={country.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{country.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{country.pubCount} pubs</p>
                <Link href={`/${country.slug}`}>
                  <Button className="w-full">Explore {country.name}</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}

