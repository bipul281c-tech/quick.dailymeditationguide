import type { Meditation, MeditationWithId } from "@/types/meditation"
import meditationsData from "@/content/meditations.json"

// Generate a stable numeric ID from a string (used for meditation titles)
// Uses a simple hash function to create a consistent numeric ID
function generateStableId(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  // Make sure it's positive and within safe integer range
  return Math.abs(hash)
}

// Cache for meditations with IDs to avoid regenerating on each call
let cachedMeditations: MeditationWithId[] | null = null
let meditationsById: Map<number, MeditationWithId> | null = null

// Helper to get all meditations with stable IDs
export function getAllMeditations(): MeditationWithId[] {
  if (cachedMeditations) {
    return cachedMeditations
  }

  cachedMeditations = (meditationsData as Meditation[]).map((meditation) => ({
    ...meditation,
    id: generateStableId(meditation.title + meditation.audio_link),
  }))

  // Build the ID map for quick lookups
  meditationsById = new Map(cachedMeditations.map((m) => [m.id, m]))

  return cachedMeditations
}

// Get a single meditation by ID
export function getMeditationById(id: number): MeditationWithId | null {
  // Ensure cache is populated
  getAllMeditations()

  return meditationsById?.get(id) ?? null
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
