"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="/england"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            England
          </Link>
          <Link
            href="/scotland"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Scotland
          </Link>
          <Link
            href="/wales"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Wales
          </Link>
          <Link
            href="/northern-ireland"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Northern Ireland
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

