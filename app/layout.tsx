import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pint.run - UK Pub Directory",
  description: "Discover and explore the best pubs across the United Kingdom",
  keywords: [
    "pubs",
    "UK pubs",
    "pub finder",
    "pub directory",
    "beer",
    "real ale",
    "England pubs",
    "Scotland pubs",
    "Wales pubs",
    "Northern Ireland pubs",
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        {children}

        {/* Google AdSense script would go here in production */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </body>
    </html>
  )
}



import './globals.css'