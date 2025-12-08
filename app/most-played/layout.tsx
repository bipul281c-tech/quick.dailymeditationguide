import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Most Played Meditations",
    description: "Discover the most popular guided meditations loved by our community. Browse top-ranked tracks for sleep, anxiety relief, focus, and deep relaxation.",
    openGraph: {
        title: "Most Played Meditations | Daily Meditation Guide",
        description: "Discover the most popular guided meditations loved by our community. Browse top-ranked tracks for sleep, anxiety relief, focus, and deep relaxation.",
        url: "https://www.quick.dailymeditationguide.com/most-played",
        siteName: "Daily Meditation Guide",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Most Played Meditations | Daily Meditation Guide",
        description: "Discover the most popular guided meditations loved by our community.",
    },
    alternates: {
        canonical: "https://www.quick.dailymeditationguide.com/most-played",
    },
}

export default function MostPlayedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
