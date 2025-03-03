import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

export default function ColorExample() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Pint.run Color Update</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Primary Button (Dark Green)</h3>
          <Button className="w-full">
            <Search className="mr-2 h-4 w-4" />
            Search Pubs
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Rating Badge</h3>
          <div className="flex items-center bg-primary/10 text-primary px-3 py-2 rounded-md w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 mr-1 fill-primary"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">8.7</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Feature Icons</h3>
          <div className="flex gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary"
              >
                <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                <line x1="6" x2="6" y1="2" y2="4" />
                <line x1="10" x2="10" y1="2" y2="4" />
                <line x1="14" x2="14" y1="2" y2="4" />
              </svg>
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary"
              >
                <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                <path d="M21 8V5a2 2 0 0 0-2-2H8" />
                <path d="M3 16v3a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-3" />
                <path d="M3 9v7h7" />
                <path d="M21 9v7h-7" />
                <path d="M7 21v-7" />
                <path d="M17 21v-7" />
              </svg>
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary text-primary-foreground rounded-md">
          <p className="font-medium">Dark green background with white text</p>
          <p className="text-sm opacity-90">
            This demonstrates the contrast between the new primary color and white text.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

