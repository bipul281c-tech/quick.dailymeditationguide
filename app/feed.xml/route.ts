import { getAllMeditations } from "@/lib/meditations"
import type { MeditationWithId } from "@/types/meditation"

// Force dynamic rendering to ensure route works in production
export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

const SITE_URL = "https://www.quick.dailymeditationguide.com"
const SITE_TITLE = "Daily Meditation Guide"
const SITE_DESCRIPTION = "Immersive audio landscapes, guided meditations, and sleep stories designed to help you focus, breathe, and restore balance to your day."

// Helper to extract duration from title (e.g., "10 Minute" -> 600 seconds)
function extractDurationSeconds(title: string): number | null {
  const match = title.match(/(\d+)\s*(?:minute|min)/i)
  if (match) {
    return parseInt(match[1], 10) * 60
  }
  return null
}

// Helper to escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

// Helper to create a valid RFC 822 date string
function toRFC822Date(dateStr: string): string {
  try {
    const date = new Date(dateStr.replace(" ", "T") + "Z")
    return date.toUTCString()
  } catch {
    return new Date().toUTCString()
  }
}

// Generate RSS item for a meditation
function generateRssItem(meditation: MeditationWithId): string {
  const playUrl = `${SITE_URL}/play/${meditation.id}`
  const duration = extractDurationSeconds(meditation.title)
  const durationFormatted = duration ? `${Math.floor(duration / 60)} minutes` : ""

  // Get the processed_at date if available, otherwise use current date
  const pubDate = (meditation as any).processed_at
    ? toRFC822Date((meditation as any).processed_at)
    : new Date().toUTCString()

  const keywords = meditation.keywords?.join(", ") || ""

  return `    <item>
      <title>${escapeXml(meditation.title)}</title>
      <link>${playUrl}</link>
      <guid isPermaLink="true">${playUrl}</guid>
      <description><![CDATA[${meditation.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <enclosure url="${meditation.audio_link}" type="audio/mpeg" />
      <media:content url="${meditation.thumbnail}" type="image/webp" medium="image" />
      <media:thumbnail url="${meditation.thumbnail}" />
      ${duration ? `<itunes:duration>${duration}</itunes:duration>` : ""}
      ${keywords ? `<category>${escapeXml(keywords)}</category>` : ""}
      ${durationFormatted ? `<itunes:subtitle>${escapeXml(durationFormatted)} guided meditation</itunes:subtitle>` : ""}
    </item>`
}

export async function GET() {
  const meditations = getAllMeditations()

  const rssItems = meditations.map(generateRssItem).join("\n")

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/icon-512x512.png</url>
      <title>${SITE_TITLE}</title>
      <link>${SITE_URL}</link>
    </image>
    <itunes:author>${SITE_TITLE}</itunes:author>
    <itunes:summary>${SITE_DESCRIPTION}</itunes:summary>
    <itunes:category text="Health &amp; Fitness">
      <itunes:category text="Mental Health"/>
    </itunes:category>
    <itunes:image href="${SITE_URL}/icon-512x512.png" />
    <itunes:explicit>false</itunes:explicit>
${rssItems}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}

