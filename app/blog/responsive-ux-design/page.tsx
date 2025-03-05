import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Share2 } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { PubCard } from "@/components/pub/pub-card"
import { AdPlaceholder } from "@/components/ads/AdPlaceholder"

export default function ResponsiveUXBlogPost() {
  // Sample related pubs data
  const relatedPubs = [
    {
      id: "1",
      name: "The Red Lion",
      slug: "the-red-lion",
      image: "/placeholder.svg?height=300&width=500",
      location: {
        neighborhood: "Soho",
        city: "london",
        country: "uk",
      },
      rating: 9.2,
      primaryCategory: "Historical Pubs",
      localsTouristsValue: 60,
    },
    {
      id: "2",
      name: "The Crown & Anchor",
      slug: "the-crown-and-anchor",
      image: "/placeholder.svg?height=300&width=500",
      location: {
        neighborhood: "Covent Garden",
        city: "london",
        country: "uk",
      },
      rating: 8.7,
      primaryCategory: "Best Ales",
      localsTouristsValue: 40,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Back to blog button - visible on mobile, sticky */}
      <div className="sticky top-16 z-10 md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container py-2">
          <Link href="/blog" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Blog
          </Link>
        </div>
      </div>

      <div className="container py-6">
        {/* Breadcrumb - hidden on mobile */}
        <div className="hidden md:block">
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: "Responsive UX Design", href: "/blog/responsive-ux-design" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6">
          {/* Main content */}
          <div className="lg:col-span-8">
            {/* Article header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">UX Design</span>
                <span className="bg-muted px-3 py-1 rounded-full text-sm">Responsive Design</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Creating the Perfect Pub Experience Across All Devices
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                How to optimize your pub's digital presence for desktops, tablets, and mobile devices to reach more
                customers and enhance their experience.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>8 min read</span>
                </div>
                <div className="flex-1"></div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Share article">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="Responsive design across devices"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                priority
              />
            </div>

            {/* Article content */}
            <article className="prose prose-emerald max-w-none lg:prose-lg">
              <h2>Why Responsive Design Matters for Pubs</h2>

              <p>
                In today's digital world, your pub's online presence is often the first impression potential customers
                will have. Whether they're searching for a place to grab a pint on their phone while walking down the
                street, planning an evening out on their tablet from the comfort of their sofa, or researching venues
                for a large gathering on their desktop at work, your website needs to provide an optimal experience
                across all devices.
              </p>

              <p>
                According to recent studies, over 60% of pub searches now happen on mobile devices, with that number
                rising to 80% for searches conducted within an hour of visiting. This means that having a responsive,
                mobile-friendly website isn't just a nice-to-have—it's essential for capturing business.
              </p>

              <div className="not-prose my-8 p-6 bg-muted rounded-lg">
                <blockquote className="italic text-lg border-l-4 border-primary pl-4">
                  "The best pub websites don't just look good—they provide the right information at the right time,
                  regardless of the device being used."
                </blockquote>
              </div>

              {/* AD PLACEHOLDER: BlogPost-MiddleOfArticle */}
              <div className="not-prose my-12">
                <AdPlaceholder id="blog-post-middle" format="horizontal" />
              </div>

              <h2>Desktop Experience: Comprehensive and Immersive</h2>

              <p>
                On larger screens, pub websites have the luxury of space. This allows for rich, immersive experiences
                that can showcase your venue in all its glory. High-resolution images, virtual tours, and detailed
                information about your history, menu, and events can all be prominently displayed.
              </p>

              <h3>Best Practices for Desktop:</h3>

              <ul>
                <li>
                  <strong>Multi-column layouts</strong> - Take advantage of the screen real estate to show more content
                  without requiring excessive scrolling
                </li>
                <li>
                  <strong>High-resolution imagery</strong> - Showcase your pub's atmosphere with large, beautiful photos
                </li>
                <li>
                  <strong>Interactive elements</strong> - Consider adding interactive floor plans, 360° views, or
                  detailed event calendars
                </li>
                <li>
                  <strong>Hover states</strong> - Use hover effects to enhance interactivity and provide additional
                  information
                </li>
              </ul>

              <figure className="my-8">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=800"
                    alt="Desktop pub website example"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                  />
                </div>
                <figcaption className="text-center text-sm text-muted-foreground mt-2">
                  Example of an effective desktop layout for a pub website
                </figcaption>
              </figure>

              <h2>Tablet Experience: The Best of Both Worlds</h2>

              <p>
                Tablets occupy a middle ground between the spaciousness of desktops and the constraints of smartphones.
                Users on tablets are often in a more relaxed setting, perhaps browsing from their sofa or during a
                commute. They expect a comfortable experience that doesn't require the precision of a mouse but still
                takes advantage of the larger screen.
              </p>

              <h3>Best Practices for Tablets:</h3>

              <ul>
                <li>
                  <strong>Adaptable layouts</strong> - Design layouts that can gracefully transition between desktop and
                  mobile views
                </li>
                <li>
                  <strong>Touch-friendly targets</strong> - Ensure buttons and links are large enough to be easily
                  tapped
                </li>
                <li>
                  <strong>Simplified navigation</strong> - Consider collapsible menus that are easy to use with touch
                </li>
                <li>
                  <strong>Optimized images</strong> - Balance quality with load times for a smooth experience
                </li>
              </ul>

              <figure className="my-8">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=800"
                    alt="Tablet pub website example"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                  />
                </div>
                <figcaption className="text-center text-sm text-muted-foreground mt-2">
                  Tablet view balancing information density with touch-friendly controls
                </figcaption>
              </figure>

              {/* AD PLACEHOLDER: BlogPost-BeforePubsSection */}
              <div className="not-prose my-12">
                <AdPlaceholder id="blog-post-before-pubs" format="horizontal" />
              </div>

              <h2>Conclusion</h2>

              <p>
                A truly responsive pub website doesn't just change its layout for different screens—it adapts the entire
                user experience to match the context and needs of users on each device. By understanding how and why
                customers use different devices to interact with your pub online, you can create a digital presence that
                enhances your physical venue and drives more foot traffic through your door.
              </p>

              <p>
                Remember, the goal isn't to provide identical experiences across all devices, but rather to provide the
                optimal experience for each device, ensuring that every potential customer can easily find what they're
                looking for and choose your pub for their next outing.
              </p>
            </article>

            {/* Author section */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Author avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">Digital Marketing Specialist for Hospitality</p>
                </div>
              </div>
            </div>

            {/* AD PLACEHOLDER: BlogPost-BottomOfArticle */}
            <AdPlaceholder id="blog-post-bottom" format="horizontal" className="my-12" />

            {/* Share section - simplified for mobile */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center p-6 bg-muted rounded-lg">
              <div className="text-center sm:text-left">
                <h3 className="font-medium mb-1">Enjoyed this article?</h3>
                <p className="text-sm text-muted-foreground">Share it with your network</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="h-9 px-4">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar - only visible on desktop */}
          <div className="hidden lg:block lg:col-span-4 space-y-8">
            {/* Related articles */}
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-lg font-bold mb-4">Related Articles</h3>
              <div className="space-y-4">
                <a href="/blog/digital-marketing-for-pubs" className="flex gap-3 group">
                  <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Digital Marketing for Pubs"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      5 Digital Marketing Strategies Every Pub Owner Should Know
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">February 15</p>
                  </div>
                </a>
                <a href="/blog/pub-website-essentials" className="flex gap-3 group">
                  <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Pub Website Essentials"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      The Essential Elements Every Pub Website Needs
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">January 28</p>
                  </div>
                </a>
                <a href="/blog/social-media-for-pubs" className="flex gap-3 group">
                  <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Social Media for Pubs"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      How to Build a Loyal Following on Social Media for Your Pub
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">January 10</p>
                  </div>
                </a>
              </div>
            </div>

            {/* AD PLACEHOLDER: BlogPost-Sidebar */}
            <AdPlaceholder id="blog-post-sidebar" format="vertical" className="mx-auto" />

            {/* Related pubs */}
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-lg font-bold mb-4">Pubs with Great Digital Presence</h3>
              <div className="space-y-6">
                {relatedPubs.map((pub) => (
                  <PubCard key={pub.id} pub={pub} size="sm" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only related content */}
        <div className="lg:hidden mt-8 space-y-8">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-lg font-bold mb-4">Related Articles</h3>
            <div className="space-y-4">
              <a href="/blog/digital-marketing-for-pubs" className="flex gap-3 group">
                <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Digital Marketing for Pubs"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    5 Digital Marketing Strategies Every Pub Owner Should Know
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">February 15</p>
                </div>
              </a>
              <a href="/blog/pub-website-essentials" className="flex gap-3 group">
                <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Pub Website Essentials"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    The Essential Elements Every Pub Website Needs
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">January 28</p>
                </div>
              </a>
            </div>
          </div>

          {/* Mobile-optimized pubs section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Pubs with Great Digital Presence</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPubs.map((pub) => (
                <PubCard key={pub.id} pub={pub} size="sm" />
              ))}
            </div>
          </div>
        </div>

        {/* Next/Previous article navigation - responsive */}
        <div className="mt-12 pt-8 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/blog/digital-marketing-for-pubs"
            className="p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <span className="text-sm text-muted-foreground">Previous Article</span>
            <h4 className="font-medium mt-1">5 Digital Marketing Strategies Every Pub Owner Should Know</h4>
          </Link>
          <Link
            href="/blog/pub-website-essentials"
            className="p-4 border rounded-lg hover:bg-muted transition-colors md:text-right"
          >
            <span className="text-sm text-muted-foreground">Next Article</span>
            <h4 className="font-medium mt-1">The Essential Elements Every Pub Website Needs</h4>
          </Link>
        </div>
      </div>
    </div>
  )
}

