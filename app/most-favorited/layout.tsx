import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Most Favorited Meditations",
    description: "Explore community favorites - the most loved guided meditations for mindfulness, sleep, stress relief, and inner peace.",
    openGraph: {
        title: "Most Favorited Meditations | Daily Meditation Guide",
        description: "Explore community favorites - the most loved guided meditations for mindfulness, sleep, stress relief, and inner peace.",
        url: "https://www.quick.dailymeditationguide.com/most-favorited",
        siteName: "Daily Meditation Guide",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Most Favorited Meditations | Daily Meditation Guide",
        description: "Explore the most loved guided meditations from our community.",
    },
    alternates: {
        canonical: "https://www.quick.dailymeditationguide.com/most-favorited",
    },
}

export default function MostFavoritedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
