import { getAllMeditations } from "@/lib/meditations"
import { MeditationLibrary } from "@/components/meditation-library"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AmbientBackground } from "@/components/ambient-background"

export const metadata = {
    title: "Meditation Library | Daily Meditation Guide",
    description: "Browse our complete collection of guided meditations for sleep, anxiety, focus, and more.",
}

export default function LibraryPage() {
    const meditations = getAllMeditations()

    return (
        <div className="bg-background text-foreground antialiased selection:bg-celadon-light selection:text-primary-foreground overflow-x-hidden relative min-h-screen">
            <AmbientBackground />
            <Navigation />

            <main className="pt-32 pb-24 px-6 relative min-h-screen max-w-6xl mx-auto">
                <MeditationLibrary initialMeditations={meditations} />
            </main>

            <Footer />
        </div>
    )
}
