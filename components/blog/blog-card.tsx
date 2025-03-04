import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"

interface BlogCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt: string
    image: string
    category: string
    readTime: number
    date: string
  }
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const { title, slug, excerpt, image, category, readTime, date } = post

  if (featured) {
    return (
      <Link href={`/blog/${slug}`} className="group">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-lg">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
              {category}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{date}</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${slug}`} className="group">
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
            {category}
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
            <span>{date}</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

