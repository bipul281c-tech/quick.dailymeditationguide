"use client"

import { Play, Pause, MoreHorizontal } from "lucide-react"
import type { Meditation } from "@/types/meditation"

interface TrackListProps {
  meditations: Meditation[]
  currentTrackIndex: number
  isPlaying: boolean
  onTrackSelect: (index: number) => void
}

export function TrackList({ meditations, currentTrackIndex, isPlaying, onTrackSelect }: TrackListProps) {
  return (
    <div className="mt-24 max-w-4xl mx-auto w-full overflow-hidden">
      <div className="flex items-end justify-between mb-8">
        <h3 className="text-xl font-medium tracking-tight text-foreground">All Meditations</h3>
        <span className="text-sm font-medium text-muted-foreground">{meditations.length} tracks</span>
      </div>

      <div className="grid gap-3">
        {meditations.map((track, index) => {
          const isCurrentTrack = currentTrackIndex === index

          return (
            <div
              key={index}
              className={`group flex items-center p-4 border rounded-xl transition-all duration-200 cursor-pointer overflow-hidden ${
                isCurrentTrack
                  ? "bg-card border-celadon shadow-sm"
                  : "bg-card/40 border-border/60 hover:bg-card hover:border-border hover:shadow-sm"
              }`}
              onClick={() => onTrackSelect(index)}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 mr-3">
                <img
                  src={track.thumbnail || "/placeholder.svg"}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  isCurrentTrack ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {isCurrentTrack && isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </div>
              <div className="ml-4 flex-1 min-w-0 overflow-hidden">
                <h4 className="text-sm font-semibold text-foreground truncate">{track.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2 break-words">{track.description}</p>
                {track.keywords && track.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {track.keywords.slice(0, 3).map((keyword, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] font-medium bg-celadon-light/50 text-celadon-dark rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="ml-4 text-muted-foreground/50 hover:text-foreground shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
