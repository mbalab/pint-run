import type React from "react"
import type { Metadata } from "next"
import "./styles.css"

export const metadata: Metadata = {
  title: "Creating the Perfect Pub Experience Across All Devices | Pint Run Blog",
  description:
    "Learn how to optimize your pub's digital presence for desktops, tablets, and mobile devices to reach more customers and enhance their experience.",
  openGraph: {
    title: "Creating the Perfect Pub Experience Across All Devices",
    description: "Learn how to optimize your pub's digital presence for desktops, tablets, and mobile devices.",
    type: "article",
    authors: ["Sarah Johnson"],
    tags: ["UX Design", "Responsive Design", "Pub Marketing"],
  },
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

