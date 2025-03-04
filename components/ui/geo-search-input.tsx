"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

export interface GeoSearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void
}

export const GeoSearchInput = React.forwardRef<HTMLInputElement, GeoSearchInputProps>(
  ({ className, type = "search", onSearch, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const router = useRouter()

    const handleGeoLocationClick = async (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser")
        return
      }

      setIsLoading(true)

      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setIsLoading(false)
            // Navigate to search page with map view and coordinates
            router.push(`/search?view=map&lat=${latitude}&lng=${longitude}&radius=1`)
          },
          (error) => {
            setIsLoading(false)
            console.error("Error getting location:", error)
            if (error.code === error.PERMISSION_DENIED) {
              alert("Location permission denied. Please enable location services to use this feature.")
            } else {
              alert("Unable to retrieve your location. Please try again later.")
            }
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
        )
      } catch (error) {
        setIsLoading(false)
        console.error("Error requesting geolocation:", error)
        alert("An error occurred while trying to access your location.")
      }
    }

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={ref}
          {...props}
        />
        <div
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 ${isFocused ? "cursor-pointer text-primary" : "text-muted-foreground"}`}
          onClick={isFocused ? handleGeoLocationClick : undefined}
        >
          {isFocused ? (
            isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <MapPin className="h-4 w-4" />
            )
          ) : (
            <Search className="h-4 w-4" />
          )}
        </div>
      </div>
    )
  },
)

GeoSearchInput.displayName = "GeoSearchInput"

