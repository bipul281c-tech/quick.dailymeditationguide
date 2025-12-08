import { MetadataRoute } from 'next'
import { getAllMeditations } from '@/lib/meditations'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.quick.dailymeditationguide.com'
    const meditations = getAllMeditations()

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/library`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/most-played`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/most-favorited`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/favorites`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
    ]

    // Individual meditation play pages
    const meditationPages: MetadataRoute.Sitemap = meditations.map((meditation) => {
        const processedAt = (meditation as any).processed_at
        const lastModified = processedAt
            ? new Date(processedAt.replace(' ', 'T') + 'Z')
            : new Date()

        return {
            url: `${baseUrl}/play/${meditation.id}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }
    })

    return [...staticPages, ...meditationPages]
}
