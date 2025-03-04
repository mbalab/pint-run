import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function getRatingColor(rating: number): string {
  if (rating >= 9) return "bg-green-600"
  if (rating >= 7.5) return "bg-green-500"
  if (rating >= 6) return "bg-amber-500"
  if (rating >= 4) return "bg-amber-600"
  return "bg-red-500"
}

export function getLocalsVsTouristsLabel(value: number): string {
  if (value <= 20) return "Locals' Secret"
  if (value <= 40) return "Mostly Locals"
  if (value <= 60) return "Mixed Crowd"
  if (value <= 80) return "Tourist Friendly"
  return "Tourist Hotspot"
}

