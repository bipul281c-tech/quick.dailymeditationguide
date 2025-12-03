"use client"

import { useState, useMemo } from "react"
import type { MeditationWithId } from "@/types/meditation"
import { FilterBar } from "@/components/filter-bar"
import { MeditationGrid } from "@/components/meditation-grid"
import { useRouter } from "next/navigation"

interface MeditationLibraryProps {
    initialMeditations: MeditationWithId[]
}

export function MeditationLibrary({ initialMeditations }: MeditationLibraryProps) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedDuration, setSelectedDuration] = useState<string | null>(null)
    const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)

    // Extract all unique keywords from meditations
    const availableKeywords = useMemo(() => {
        const keywords = new Set<string>()
        initialMeditations.forEach((meditation) => {
            meditation.keywords?.forEach((k) => keywords.add(k))
        })
        return Array.from(keywords).sort()
    }, [initialMeditations])

    // Filter meditations based on search, duration, and keyword
    const filteredMeditations = useMemo(() => {
        return initialMeditations.filter((meditation) => {
            // Search filter
            const searchLower = searchQuery.toLowerCase()
            const matchesSearch =
                !searchQuery ||
                meditation.title.toLowerCase().includes(searchLower) ||
                meditation.description.toLowerCase().includes(searchLower) ||
                meditation.keywords?.some((k) => k.toLowerCase().includes(searchLower))

            // Duration filter (parsing "X Minute" from title)
            let matchesDuration = true
            if (selectedDuration) {
                // Extract number from selected duration (e.g., "10 Minute" -> 10)
                const targetMinutes = parseInt(selectedDuration)

                // Check if title contains the duration string (e.g., "10 Minute")
                // We look for the number followed by "minute" or "min"
                const durationRegex = new RegExp(`\\b${targetMinutes}\\s*(?:minute|min)`, 'i')
                matchesDuration = durationRegex.test(meditation.title)
            }

            // Keyword filter
            const matchesKeyword =
                !selectedKeyword ||
                meditation.keywords?.includes(selectedKeyword)

            return matchesSearch && matchesDuration && matchesKeyword
        })
    }, [initialMeditations, searchQuery, selectedDuration, selectedKeyword])

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">Meditation Library</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Explore our collection of guided meditations designed to help you find peace, focus, and relaxation.
                </p>
            </div>

            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDuration={selectedDuration}
                onDurationChange={setSelectedDuration}
                selectedKeyword={selectedKeyword}
                onKeywordChange={setSelectedKeyword}
                availableKeywords={availableKeywords}
                resultCount={filteredMeditations.length}
            />

            <MeditationGrid
                meditations={filteredMeditations}
                onPlay={(meditation) => {
                    // Navigate to home page with the track ID to play it
                    router.push(`/?playId=${meditation.id}`)
                }}
            />
        </div>
    )
}
