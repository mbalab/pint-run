import type { Metadata } from "next"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export const metadata: Metadata = {
  title: "About Pint.run - UK Pub Directory",
  description: "Learn about Pint.run, the comprehensive UK pub directory",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">About Pint.run</h1>

            <div className="prose max-w-none">
              <p className="lead">
                Pint.run is a comprehensive directory of pubs across the United Kingdom, designed to help you discover
                great pubs wherever you are.
              </p>

              <h2>Our Mission</h2>
              <p>
                Our mission is to create the most comprehensive, accurate, and user-friendly pub directory in the UK. We
                aim to help pub-goers find their perfect pint while supporting the rich pub culture that is so vital to
                communities across the country.
              </p>

              <h2>The Pint Score</h2>
              <p>
                Every pub on Pint.run is rated using our proprietary Pint Score algorithm, which evaluates pubs on a
                scale from 0 to 10 based on multiple factors:
              </p>

              <ul>
                <li>
                  <strong>Ambience:</strong> The overall atmosphere and environment
                </li>
                <li>
                  <strong>Service:</strong> Quality of customer service
                </li>
                <li>
                  <strong>Value:</strong> Price relative to quality
                </li>
                <li>
                  <strong>Selection:</strong> Range and quality of drinks and food
                </li>
              </ul>

              <p>
                Our Pint Score provides an at-a-glance quality rating to help you quickly identify standout pubs in any
                area.
              </p>

              <h2>Coverage</h2>
              <p>Pint.run covers pubs across all four countries of the United Kingdom:</p>

              <ul>
                <li>England</li>
                <li>Scotland</li>
                <li>Wales</li>
                <li>Northern Ireland</li>
              </ul>

              <p>
                We're constantly expanding our directory to ensure comprehensive coverage of both urban and rural areas.
              </p>

              <h2>Our Team</h2>
              <p>
                Pint.run was created by a small team of pub enthusiasts with backgrounds in web development, data
                science, and the hospitality industry. We're passionate about pubs and dedicated to creating the best
                resource for pub-goers.
              </p>

              <h2>Contact Us</h2>
              <p>
                Have questions, feedback, or spotted an error? We'd love to hear from you. Contact us at info@pint.run.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

