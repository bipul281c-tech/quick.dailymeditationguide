import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { AmbientBackground } from "@/components/ambient-background"
import { getMeditationById, getAllMeditations, getRelatedMeditations } from "@/lib/meditations"
import { Spinner } from "@/components/ui/spinner"
import { MeditationPlayClient } from "./meditation-play-client"

interface PlayPageProps {
  params: Promise<{ id: string }>
}

// Generate static params for all meditations - ensures all pages are pre-rendered
export async function generateStaticParams() {
  const meditations = getAllMeditations()
  return meditations.map((meditation) => ({
    id: meditation.id.toString(),
  }))
}

// Helper to extract duration from title (e.g., "10 Minute" -> "PT10M")
function extractDuration(title: string): string {
  const match = title.match(/(\d+)\s*minute/i)
  if (match) {
    return `PT${match[1]}M`
  }
  return "PT10M" // default 10 minutes
}

// Helper to create SEO-friendly title
function createSeoTitle(title: string): string {
  // Add "Guided Meditation" if not already present
  if (!title.toLowerCase().includes('meditation')) {
    return `${title} - Guided Meditation`
  }
  return title
}

// Helper to create SEO-friendly description
function createSeoDescription(title: string, description: string, keywords: string[]): string {
  const keywordText = keywords?.slice(0, 3).join(', ') || ''
  const baseDescription = description || `Listen to ${title} - a calming guided meditation for relaxation and mindfulness.`

  // Ensure description is between 120-160 characters for optimal SEO
  let seoDescription = baseDescription
  if (seoDescription.length < 120 && keywordText) {
    seoDescription += ` Perfect for ${keywordText}.`
  }
  if (seoDescription.length > 160) {
    seoDescription = seoDescription.substring(0, 157) + '...'
  }
  return seoDescription
}

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }: PlayPageProps): Promise<Metadata> {
  const { id } = await params
  const meditationId = parseInt(id, 10)
  const meditation = getMeditationById(meditationId)

  if (!meditation) {
    return {
      title: "Meditation Not Found",
      robots: { index: false, follow: false },
    }
  }

  const baseUrl = 'https://www.quick.dailymeditationguide.com'
  const playUrl = `${baseUrl}/play/${meditation.id}`
  const seoTitle = createSeoTitle(meditation.title)
  const seoDescription = createSeoDescription(meditation.title, meditation.description, meditation.keywords || [])

  // Ensure thumbnail is absolute URL
  const thumbnailUrl = meditation.thumbnail.startsWith('http')
    ? meditation.thumbnail
    : `${baseUrl}${meditation.thumbnail}`

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [...(meditation.keywords || []), 'guided meditation', 'mindfulness', 'relaxation', 'sleep', 'stress relief'],
    authors: [{ name: 'Daily Meditation Guide' }],
    creator: 'Daily Meditation Guide',
    publisher: 'Daily Meditation Guide',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: playUrl,
      siteName: 'Daily Meditation Guide',
      locale: 'en_US',
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: `${meditation.title} - Guided Meditation Audio`,
          type: 'image/jpeg',
        },
      ],
      type: 'music.song',
      audio: [
        {
          url: meditation.audio_link,
          type: 'audio/mpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@dailymedguide',
      creator: '@dailymedguide',
      title: seoTitle,
      description: seoDescription,
      images: {
        url: thumbnailUrl,
        alt: `${meditation.title} - Guided Meditation`,
      },
    },
    alternates: {
      canonical: playUrl,
    },
    category: 'Health & Wellness',
  }
}

function PlayerLoading() {
  return (
    <div className="max-w-4xl mx-auto w-full flex items-center justify-center py-20">
      <Spinner className="w-10 h-10 text-primary" />
    </div>
  )
}

export default async function PlayPage({ params }: PlayPageProps) {
  const { id } = await params
  const meditationId = parseInt(id, 10)

  if (isNaN(meditationId)) {
    notFound()
  }

  const meditation = getMeditationById(meditationId)

  if (!meditation) {
    notFound()
  }
  const relatedMeditations = getRelatedMeditations(meditation, 3)

  // JSON-LD structured data for the audio
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    name: meditation.title,
    description: meditation.description,
    contentUrl: meditation.audio_link,
    thumbnailUrl: meditation.thumbnail,
    uploadDate: (meditation as any).processed_at || new Date().toISOString(),
    publisher: {
      "@type": "Organization",
      name: "Daily Meditation Guide",
      logo: {
        "@type": "ImageObject",
        url: "https://www.quick.dailymeditationguide.com/logo.svg",
      },
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.quick.dailymeditationguide.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Library",
          "item": "https://www.quick.dailymeditationguide.com/library"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": meditation.title,
          "item": `https://www.quick.dailymeditationguide.com/play/${meditation.id}`
        }
      ]
    }
  }

  return (
    <div className="bg-background text-foreground antialiased selection:bg-celadon-light selection:text-primary-foreground overflow-x-hidden relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AmbientBackground />

      <main className="pt-20 md:pt-32 pb-24 px-4 md:px-6 relative max-w-4xl mx-auto min-h-screen flex flex-col">
        <Suspense fallback={<PlayerLoading />}>
          <MeditationPlayClient meditation={meditation} relatedMeditations={relatedMeditations} />
        </Suspense>
      </main>
    </div>
  )
}

