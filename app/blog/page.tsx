import type { Metadata } from "next"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { BlogCard } from "@/components/blog/blog-card"
import { AdPlaceholder } from "@/components/ads/AdPlaceholder"
import { shouldRenderAd } from "@/lib/utils/ads"
import { Fragment } from "react"

export const metadata: Metadata = {
  title: "Blog | Pint Run",
  description: "Discover articles about the best pubs, pub history, and pub culture across the UK.",
}

// This would typically come from a database or API
const blogPosts = [
  {
    id: "1",
    title: "The 10 Oldest Pubs in London You Must Visit",
    slug: "oldest-pubs-london",
    excerpt:
      "Discover the historic pubs that have been serving Londoners for centuries, each with its own unique story and atmosphere.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Historical",
    readTime: 6,
    date: "May 15, 2023",
  },
  {
    id: "2",
    title: "A Guide to London's Best Craft Beer Pubs",
    slug: "craft-beer-pubs-london",
    excerpt:
      "Explore London's thriving craft beer scene with our guide to the best pubs serving unique and locally brewed beers.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Craft Beer",
    readTime: 8,
    date: "April 28, 2023",
  },
  {
    id: "3",
    title: "Sunday Roast Showdown: London's Top 5 Pubs",
    slug: "sunday-roast-showdown",
    excerpt:
      "We compare the Sunday roasts at five of London's most beloved pubs to find out which one truly deserves the crown.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Food",
    readTime: 7,
    date: "April 10, 2023",
  },
  {
    id: "4",
    title: "The History of the British Pub: From Alehouses to Gastropubs",
    slug: "history-british-pub",
    excerpt:
      "Trace the fascinating evolution of the British pub from its humble beginnings as medieval alehouses to the modern gastropub phenomenon.",
    image: "/placeholder.svg?height=300&width=500",
    category: "History",
    readTime: 10,
    date: "March 22, 2023",
  },
  {
    id: "5",
    title: "Hidden Gems: 7 London Pubs Off the Tourist Trail",
    slug: "hidden-gems-london-pubs",
    excerpt: "Escape the crowds and discover these lesser-known London pubs that locals love but tourists rarely find.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Local Favorites",
    readTime: 5,
    date: "March 15, 2023",
  },
  {
    id: "6",
    title: "The Art of the Perfect Pint: How to Pour Different Types of Beer",
    slug: "perfect-pint-pouring-guide",
    excerpt:
      "Learn the techniques and traditions behind pouring the perfect pint, from cask ales to stouts and lagers.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Beer",
    readTime: 6,
    date: "February 28, 2023",
  },
  {
    id: "7",
    title: "Literary Pubs: Where Famous Authors Found Inspiration",
    slug: "literary-pubs-famous-authors",
    excerpt:
      "Visit the historic pubs where literary giants like Charles Dickens, George Orwell, and Dylan Thomas found inspiration and camaraderie.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Culture",
    readTime: 8,
    date: "February 14, 2023",
  },
  {
    id: "8",
    title: "Family-Friendly Pubs: Where Kids and Parents Can Both Enjoy",
    slug: "family-friendly-pubs",
    excerpt:
      "Discover pubs that welcome families with play areas, children's menus, and a relaxed atmosphere that parents will appreciate too.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Family",
    readTime: 5,
    date: "January 30, 2023",
  },
]

const categories = [
  "All Categories",
  "Historical",
  "Craft Beer",
  "Food",
  "Culture",
  "Local Favorites",
  "Beer",
  "Family",
]

export default function BlogPage() {
  return (
    <div className="container py-6">
      <Breadcrumb items={[{ label: "Blog", href: "/blog" }]} />

      <div className="py-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Pint Run Blog</h1>
        <p className="text-muted-foreground max-w-3xl mb-8">
          Discover articles about the best pubs, pub history, and pub culture across the UK.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-3">
            <div className="mb-8">
              <BlogCard post={blogPosts[0]} featured={true} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.slice(1).map((post, index) => (
                <Fragment key={post.id}>
                  <BlogCard post={post} />

                  {/* Insert ad after every 4 blog post cards */}
                  {shouldRenderAd(index + 1, 4) && (
                    <div className="col-span-full my-8">
                      {/* AD PLACEHOLDER: Blog-AfterPosts */}
                      <AdPlaceholder id={`blog-after-posts-${Math.floor((index + 1) / 4)}`} format="horizontal" />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-lg border bg-card">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a
                      href={index === 0 ? "/blog" : `/blog/category/${category.toLowerCase()}`}
                      className={`block px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                        index === 0 ? "bg-muted font-medium" : ""
                      }`}
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <h2 className="text-xl font-bold mb-4">Popular Posts</h2>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <a key={post.id} href={`/blog/${post.slug}`} className="flex gap-3 group">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* AD PLACEHOLDER: Blog-Sidebar */}
            <AdPlaceholder id="blog-sidebar" format="vertical" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

