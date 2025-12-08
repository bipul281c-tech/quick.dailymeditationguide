"use client"

import type { MeditationWithId } from "@/types/meditation"
import { useAuth } from "@/contexts/auth-context"
import { useMeditationTracking } from "@/hooks/use-meditation-tracking"
import { LibraryCard } from "@/components/library-card"

interface MeditationGridProps {
    meditations: MeditationWithId[]
    onPlay: (meditation: MeditationWithId) => void
}

export function MeditationGrid({ meditations, onPlay }: MeditationGridProps) {
    const { user } = useAuth()

    if (meditations.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No meditations found matching your criteria.</p>
                <p className="text-sm text-muted-foreground/60 mt-2">Try adjusting your filters or search terms.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meditations.map((meditation) => (
                <LibraryCard
                    key={meditation.id}
                    meditation={meditation}
                    onPlay={() => onPlay(meditation)}
                />
            ))}
        </div>
    )
}
