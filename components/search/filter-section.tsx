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
    <div className="py-2 border-b last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-2 text-left font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="mt-1 space-y-1">{children}</div>}
    </div>
  )
}

