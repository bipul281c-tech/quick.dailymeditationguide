import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { AmbientBackground } from "@/components/ambient-background"
import { MeditationPlayer } from "@/components/meditation-player"
import { ExtensionPromo } from "@/components/extension-promo"
import { getAllMeditations } from "@/lib/meditations"

export default function Home() {
  // Fetch meditations with stable IDs from the data layer
  const meditations = getAllMeditations()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Daily Meditation Guide",
    url: "https://www.quick.dailymeditationguide.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.quick.dailymeditationguide.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Daily Meditation Guide",
      logo: {
        "@type": "ImageObject",
        url: "https://www.quick.dailymeditationguide.com/logo.svg",
      },
    },
  }

  return (
    <div className="bg-background text-foreground antialiased selection:bg-celadon-light selection:text-primary-foreground overflow-x-hidden relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AmbientBackground />
      <Navigation />

      <main className="pt-32 pb-24 px-6 relative max-w-6xl mx-auto min-h-screen flex flex-col justify-center">
        <HeroSection />
        <MeditationPlayer meditations={meditations} />
      </main>

      {/* Extension Promotion Section */}
      <ExtensionPromo />

      <Footer />
    </div>
  )
}
