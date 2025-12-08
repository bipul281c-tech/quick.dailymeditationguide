import { getAllMeditations } from "@/lib/meditations"
import { MeditationLibrary } from "@/components/meditation-library"
import { AmbientBackground } from "@/components/ambient-background"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Meditation Library",
    description: "Browse our complete collection of guided meditations for sleep, anxiety, focus, stress relief, and mindfulness. Find your perfect meditation today.",
    openGraph: {
        title: "Meditation Library | Daily Meditation Guide",
        description: "Browse our complete collection of guided meditations for sleep, anxiety, focus, stress relief, and mindfulness.",
        url: "https://www.quick.dailymeditationguide.com/library",
        siteName: "Daily Meditation Guide",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Meditation Library | Daily Meditation Guide",
        description: "Browse our complete collection of guided meditations for sleep, anxiety, focus, and mindfulness.",
    },
    alternates: {
        canonical: "https://www.quick.dailymeditationguide.com/library",
    },
}


export default function LibraryPage() {
    const meditations = getAllMeditations()

    return (
        <div className="bg-background text-foreground antialiased selection:bg-celadon-light selection:text-primary-foreground overflow-x-hidden relative min-h-screen">
            <AmbientBackground />

            <main className="pt-32 pb-24 px-6 relative min-h-screen max-w-6xl mx-auto">
                <MeditationLibrary initialMeditations={meditations} />
            </main>
        </div>
    )
}
