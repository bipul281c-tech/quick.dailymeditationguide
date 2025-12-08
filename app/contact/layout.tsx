import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Daily Meditation Guide. We respond within 24-48 hours to all inquiries about meditation, feedback, and partnership opportunities.",
    openGraph: {
        title: "Contact Us | Daily Meditation Guide",
        description: "Get in touch with Daily Meditation Guide. We respond within 24-48 hours to all inquiries about meditation, feedback, and partnership opportunities.",
        url: "https://www.quick.dailymeditationguide.com/contact",
        siteName: "Daily Meditation Guide",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Contact Us | Daily Meditation Guide",
        description: "Get in touch with Daily Meditation Guide. We respond within 24-48 hours.",
    },
    alternates: {
        canonical: "https://www.quick.dailymeditationguide.com/contact",
    },
}


export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
