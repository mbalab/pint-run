import type { Pub } from "@/types/pub"

export const samplePubs: Pub[] = [
  {
    id: "the-crown-london",
    name: "The Crown & Anchor",
    location: {
      city: "London",
      country: "England",
    },
    rating: 9.2,
    description:
      "Historic 16th-century pub with original Tudor features, serving a selection of real ales and traditional British fare.",
    features: ["Real Ale", "Historic", "Sunday Roast", "Garden", "Dog Friendly"],
    type: ["historic", "traditional"],
    specialty: "Award-winning real ales and historic atmosphere",
    imageUrl: "/placeholder.svg?height=400&width=600",
    priceRange: 3,
  },
  {
    id: "royal-mile-tavern",
    name: "Royal Mile Tavern",
    location: {
      city: "Edinburgh",
      country: "Scotland",
    },
    rating: 8.8,
    description:
      "Traditional Scottish pub on the historic Royal Mile, featuring live music and an extensive whisky collection.",
    features: ["Live Music", "Traditional", "Whisky Selection", "Tourist Attraction"],
    type: ["traditional"],
    specialty: "Premium whisky selection and Scottish folk music",
    imageUrl: "/placeholder.svg?height=400&width=600",
    priceRange: 4,
  },
  {
    id: "cardiff-arms",
    name: "The Cardiff Arms",
    location: {
      city: "Cardiff",
      country: "Wales",
    },
    rating: 8.5,
    description: "Modern gastropub combining Welsh traditions with contemporary cuisine, featuring local craft beers.",
    features: ["Craft Beer", "Gastropub", "Family Friendly", "Sports Viewing"],
    type: ["modern"],
    specialty: "Welsh craft beers and modern British cuisine",
    imageUrl: "/placeholder.svg?height=400&width=600",
    priceRange: 4,
  },
  {
    id: "crown-belfast",
    name: "The Crown Liquor Saloon",
    location: {
      city: "Belfast",
      country: "Northern Ireland",
    },
    rating: 9.4,
    description:
      "Victorian gin palace with ornate interior, stained glass, and private snugs. A National Trust property.",
    features: ["Historic", "Traditional", "Tourist Attraction", "Wheelchair Access"],
    type: ["historic", "traditional"],
    specialty: "Victorian architecture and traditional Irish hospitality",
    imageUrl: "/placeholder.svg?height=400&width=600",
    priceRange: 3,
  },
  {
    id: "kings-arms-york",
    name: "The King's Arms",
    location: {
      city: "York",
      country: "England",
    },
    rating: 8.7,
    description: "Riverside pub with medieval foundations, serving local ales and hearty pub classics.",
    features: ["Real Ale", "Historic", "Garden", "Dog Friendly", "Local Favorite"],
    type: ["historic", "traditional"],
    specialty: "Riverside views and Yorkshire ales",
    imageUrl: "/placeholder.svg?height=400&width=600",
    priceRange: 2,
  },
  {
    id: "craft-social",
    name: "Craft & Social",
    location: {
      city: "Manchester",
      country: "England",
    },
    rating: 8.9,
    description: "Contemporary craft beer bar with industrial design, featuring rotating taps and street food pop-ups.",
    features: ["Craft Beer", "Modern", "Live Music", "Family Friendly"],
    type: ["modern"],
    specialty: "Rotating craft beer selection and food collaborations",
    imageUrl: "/placeholder.svg?height=400&width=600",
    priceRange: 3,
  },
]

