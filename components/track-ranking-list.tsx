import Image from "next/image"
import Link from "next/link"
import { Play, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MeditationWithId } from "@/types/meditation"
import type { MeditationPlayCount } from "@/types/supabase"

interface PlayCountWithMeditation extends MeditationPlayCount {
    meditation: MeditationWithId | null
}

interface TrackRankingListProps {
    tracks: PlayCountWithMeditation[]
    className?: string
    startIndex?: number
}

export function TrackRankingList({ tracks, className, startIndex = 2 }: TrackRankingListProps) {
    return (
        <div className={cn("space-y-4 blur-reveal", className)} style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between px-4 pb-2 border-b border-border/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="w-12 text-center">Rank</div>
                <div className="flex-1">Title</div>
                <div className="hidden sm:block w-24 text-right">Plays</div>
                <div className="hidden md:block w-32 text-right">Last Played</div>
                <div className="w-20 text-right">Time</div>
                <div className="w-12"></div>
            </div>

            {tracks.map((track, index) => {
                const meditation = track.meditation
                if (!meditation) return null

                const rank = startIndex + index
                const rankDisplay = rank < 10 ? `0${rank}` : `${rank}`
                const category = getMeditationCategory(meditation)
                const duration = getMeditationDuration(meditation)

                return (
                    <div
                        key={track.meditation_id}
                        className="group flex items-center p-3 rounded-xl hover:bg-card hover:shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-transparent hover:border-border transition-all duration-200"
                    >
                        <div className="w-12 text-center text-lg font-medium text-muted-foreground/50 group-hover:text-muted-foreground font-serif italic">
                            {rankDisplay}
                        </div>
                        <div className="flex-1 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden relative hidden sm:block">
                                <Image
                                    src={meditation.thumbnail}
                                    alt={meditation.title}
                                    fill
                                    className="object-cover opacity-80"
                                />
                                {/* Playing Animation (Hidden by default, shown on hover/active) */}
                                <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-1 gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-0.5 bg-white rounded-full bar" style={{ animationDuration: "400ms" }}></div>
                                    <div className="w-0.5 bg-white rounded-full bar" style={{ animationDuration: "550ms" }}></div>
                                    <div className="w-0.5 bg-white rounded-full bar" style={{ animationDuration: "450ms" }}></div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                    {meditation.title}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                    {category}
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:flex w-24 items-center justify-end gap-1 text-sm text-muted-foreground">
                            <Headphones className="w-3.5 h-3.5" />
                            <span className="tabular-nums">{track.play_count.toLocaleString()}</span>
                        </div>
                        <div className="hidden md:block w-32 text-right text-xs text-muted-foreground">
                            {new Date(track.last_played_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="w-20 text-right text-sm font-medium text-muted-foreground tabular-nums">
                            {duration}
                        </div>
                        <div className="w-12 flex justify-end">
                            <Link href={`/?playId=${meditation.id}`}>
                                <button className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                    <Play className="w-4 h-4 fill-current" />
                                </button>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function getMeditationCategory(meditation: MeditationWithId): string {
    // Try to derive category from keywords or title
    if (meditation.keywords && meditation.keywords.length > 0) {
        // Return the first keyword that looks like a category, or just the first keyword
        return meditation.keywords[0].charAt(0).toUpperCase() + meditation.keywords[0].slice(1)
    }

    if (meditation.title.toLowerCase().includes("sleep")) return "Sleep Stories"
    if (meditation.title.toLowerCase().includes("morning")) return "Morning"
    if (meditation.title.toLowerCase().includes("anxiety")) return "Anxiety"

    return "Guided"
}

function getMeditationDuration(meditation: MeditationWithId): string {
    // Try to extract duration from title (e.g. "10 Minute")
    const match = meditation.title.match(/(\d+)\s*minute/i)
    if (match && match[1]) {
        return `${match[1]}:00`
    }
    return "10:00" // Default
}
