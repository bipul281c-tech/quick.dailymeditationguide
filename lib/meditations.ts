import type { Meditation, MeditationWithId } from "@/types/meditation"
import meditationsData from "@/content/meditations.json"

// Helper to get all meditations with IDs
export function getAllMeditations(): MeditationWithId[] {
  return (meditationsData as Meditation[]).map((meditation, index) => ({
    ...meditation,
    id: index,
  }))
}

// Get a single meditation by ID
export function getMeditationById(id: number): MeditationWithId | null {
  const meditations = getAllMeditations()
  if (id < 0 || id >= meditations.length) {
    return null
  }
  return meditations[id]
}

// Search meditations by keyword in title, description, or keywords array
export function searchMeditations(query: string): MeditationWithId[] {
  const meditations = getAllMeditations()
  const lowerQuery = query.toLowerCase().trim()

  if (!lowerQuery) {
    return meditations
  }

  return meditations.filter(
    (meditation) =>
      meditation.title.toLowerCase().includes(lowerQuery) ||
      meditation.description.toLowerCase().includes(lowerQuery) ||
      (meditation.keywords && meditation.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))),
  )
}
