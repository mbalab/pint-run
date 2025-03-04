"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="py-3 border-b last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-2 text-left font-medium text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`filter-section-${title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="mt-2 space-y-1 pl-1" id={`filter-section-${title.toLowerCase().replace(/\s+/g, "-")}`}>
          {children}
        </div>
      )}
    </div>
  )
}

