"use client"

import { Play, Heart, Star, User, Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { MeditationWithId } from "@/types/meditation"
import { useMeditationTracking } from "@/hooks/use-meditation-tracking"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

interface LibraryCardProps {
    meditation: MeditationWithId
    onPlay: () => void
}

export function LibraryCard({ meditation, onPlay }: LibraryCardProps) {
    const { user } = useAuth()
    const isAuthenticated = !!user
    const { isLiked, isFavorited, toggleLike, toggleFavorite } = useMeditationTracking()

    const liked = isLiked(meditation.id)
    const favorited = isFavorited(meditation.id)

    const handleLikeClick = async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!isAuthenticated) return
        await toggleLike(meditation.id)
    }

    const handleFavoriteClick = async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!isAuthenticated) return
        await toggleFavorite(meditation.id)
    }

    return (
        <div
            className="group flex flex-col gap-4 bg-card hover:bg-muted/30 p-5 rounded-3xl border border-border/40 transition-all duration-300 hover:border-celadon/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer"
            onClick={onPlay}
        >
            {/* Header: Tags & Actions */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    {/* Primary Badge */}
                    <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-celadon/10 text-celadon-dark text-xs font-semibold tracking-wide">
                        <Layers className="w-3 h-3 mr-1.5" />
                        Meditation
                    </div>

                    {/* Secondary Badge (First Keyword) */}
                    {meditation.keywords && meditation.keywords.length > 0 && (
                        <div className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-medium">
                            {meditation.keywords[0]}
                        </div>
                    )}
                </div>

                {isAuthenticated && (
                    <button
                        className={cn(
                            "p-2 rounded-full transition-colors hover:bg-muted",
                            favorited ? "text-amber-400" : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={handleFavoriteClick}
                    >
                        {favorited ? (
                            <Star className="w-5 h-5 fill-current" />
                        ) : (
                            <Star className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>

            {/* Content: Title & Description */}
            <div className="space-y-2">
                <h3 className="text-xl font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {meditation.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {meditation.description}
                </p>
            </div>

            {/* Media: Large Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
                <img
                    src={meditation.thumbnail || "/placeholder.svg"}
                    alt={meditation.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay Play Button (Appear on Hover) */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="w-16 h-16 rounded-full bg-background/90 text-primary flex items-center justify-center shadow-xl transform scale-90 transition-transform duration-300 group-hover:scale-100">
                        <Play className="w-6 h-6 ml-1 fill-current" />
                    </div>
                </div>
            </div>

            {/* Footer: Author & Action */}
            <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-celadon/20 text-celadon-dark">
                        <User className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-foreground">Daily Meditation Guide</span>
                        <span className="text-[10px] text-muted-foreground">Author</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* View Count / Duration - Placeholder for now could be added here */}
                    {isAuthenticated && (
                        <button
                            className={cn(
                                "flex items-center gap-1.5 text-xs font-medium transition-colors hover:bg-muted px-2 py-1 rounded-full",
                                liked ? "text-peach" : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={handleLikeClick}
                        >
                            <Heart className={cn("w-4 h-4", liked && "fill-current")} />
                            {liked ? "Liked" : "Like"}
                        </button>
                    )}

                    <div className="flex items-center gap-1 text-xs font-medium text-primary hover:text-celadon-dark transition-colors">
                        Read Post <span className="text-base">→</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
