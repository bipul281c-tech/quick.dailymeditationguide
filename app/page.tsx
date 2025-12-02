import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { AmbientBackground } from "@/components/ambient-background"
import { MeditationPlayer } from "@/components/meditation-player"
import { ExtensionPromo } from "@/components/extension-promo"
import meditations from "@/content/meditations.json"

export default function Home() {
  return (
    <div className="bg-background text-foreground antialiased selection:bg-celadon-light selection:text-primary-foreground overflow-x-hidden relative min-h-screen">
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
