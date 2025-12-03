"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, Heart, Star, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import type { MeditationWithId } from "@/types/meditation"
import { useMeditationTracking } from "@/hooks/use-meditation-tracking"
import { useAuth } from "@/contexts/auth-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Spinner } from "@/components/ui/spinner"

interface MeditationPlayClientProps {
  meditation: MeditationWithId
  relatedMeditations?: MeditationWithId[]
}

export function MeditationPlayClient({ meditation, relatedMeditations = [] }: MeditationPlayClientProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasRecordedPlay, setHasRecordedPlay] = useState(false)
  const [autoplayAttempted, setAutoplayAttempted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const { user, initializing: authInitializing } = useAuth()
  const {
    isLiked,
    isFavorited,
    toggleLike,
    toggleFavorite,
    recordPlay,
    updateProgress,
    isAuthenticated,
    loading: trackingLoading
  } = useMeditationTracking()

  const showActionLoading = authInitializing || (isAuthenticated && trackingLoading)
  const meditationIsLiked = isLiked(meditation.id)
  const meditationIsFavorited = isFavorited(meditation.id)

  // Auto-play when the component mounts
  useEffect(() => {
    if (!autoplayAttempted && audioRef.current) {
      setAutoplayAttempted(true)

      // Small delay to ensure audio is ready
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              // Autoplay was blocked - user needs to interact
              console.log("Autoplay blocked, waiting for user interaction:", error)
              setIsPlaying(false)
            })
        }
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [autoplayAttempted])

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      if (isAuthenticated) {
        updateProgress(Math.floor(audio.duration), true)
      }
    }
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
    }
  }, [isAuthenticated, updateProgress])

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
        if (!hasRecordedPlay && isAuthenticated && duration > 0) {
          recordPlay(meditation.id, Math.floor(duration))
          setHasRecordedPlay(true)
        }
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying, hasRecordedPlay, isAuthenticated, duration, meditation.id, recordPlay])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleLikeClick = async () => {
    if (!isAuthenticated) return
    await toggleLike(meditation.id)
  }

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) return
    await toggleFavorite(meditation.id)
  }

  const handleShare = async () => {
    const shareUrl = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: meditation.title,
          text: meditation.description,
          url: shareUrl,
        })
      } catch (error) {
        console.log("Share cancelled or failed")
      }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      alert("Link copied to clipboard!")
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="w-full blur-reveal delay-200 flex flex-col items-center justify-start md:justify-center min-h-0 md:min-h-[70vh]">
      <audio ref={audioRef} src={meditation.audio_link} preload="metadata" />

      {/* Breadcrumbs */}
      <div className="w-full max-w-xl mb-4 md:mb-6 px-4 flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/library" className="hover:text-foreground transition-colors">Library</Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-[150px] md:max-w-[200px] min-w-0">{meditation.title}</span>
      </div>

      {/* Back navigation - subtle and minimal */}
      <div className="w-full max-w-xl mb-3 md:mb-6 px-4">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>

      {/* Main player card - with outline instead of shadow */}
      <div className="w-full max-w-xl bg-card/70 backdrop-blur-xl outline outline-1 outline-border/60 rounded-xl md:rounded-2xl p-4 md:p-8">
        {/* Album art */}
        <div className="relative mb-4 md:mb-6">
          {/* Subtle ambient glow behind the image */}
          <div
            className="absolute inset-0 blur-3xl opacity-40 scale-90 hidden md:block"
            style={{
              background: `radial-gradient(circle, var(--celadon) 0%, var(--celadon-light) 40%, transparent 70%)`
            }}
          />

          <div
            className="relative aspect-square max-w-[200px] md:max-w-[280px] mx-auto rounded-lg md:rounded-xl overflow-hidden cursor-pointer group outline outline-1 outline-border/40"
            onClick={togglePlay}
          >
            <img
              src={meditation.thumbnail || "/placeholder.svg"}
              alt={meditation.title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

            {/* Play/Pause indicator - elegant center button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`
                w-14 h-14 md:w-16 md:h-16 rounded-full backdrop-blur-md bg-white/25 border border-white/40
                flex items-center justify-center
                transition-all duration-500 ease-out
                ${isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
                group-hover:opacity-100 group-hover:scale-100
              `}>
                {isPlaying ? (
                  <Pause className="w-6 h-6 md:w-7 md:h-7 text-white" />
                ) : (
                  <Play className="w-6 h-6 md:w-7 md:h-7 text-white ml-0.5" />
                )}
              </div>
            </div>

            {/* Playing indicator - animated bars */}
            {isPlaying && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-0.5 items-end">
                <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms', animationDuration: '0.8s' }} />
                <span className="w-0.5 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '200ms', animationDuration: '0.6s' }} />
                <span className="w-0.5 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '100ms', animationDuration: '0.7s' }} />
                <span className="w-0.5 h-5 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms', animationDuration: '0.5s' }} />
                <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms', animationDuration: '0.9s' }} />
              </div>
            )}
          </div>
        </div>

        {/* Track info - compact for mobile */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-lg md:text-xl font-semibold text-foreground mb-1.5 md:mb-2 tracking-tight leading-snug line-clamp-2">
            {meditation.title}
          </h1>
          <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-md mx-auto line-clamp-2">
            {meditation.description}
          </p>
        </div>

        {/* Progress bar - compact */}
        <div className="mb-4 md:mb-6">
          <div className="relative h-1 md:h-1.5 bg-border/60 rounded-full overflow-hidden group cursor-pointer">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--celadon-dark)] via-[var(--celadon)] to-[var(--celadon-light)] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
            {/* Progress dot indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full border-2 border-[var(--celadon)] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 5px)` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-[10px] md:text-xs text-muted-foreground mt-1.5 md:mt-2 tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls - compact for mobile */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
          {/* Action buttons - left side */}
          <TooltipProvider delayDuration={300}>
            {showActionLoading ? (
              <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center">
                <Spinner className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground/50" />
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleFavoriteClick}
                    disabled={!isAuthenticated}
                    className={`
                      w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center
                      transition-all duration-300 ease-out
                      ${meditationIsFavorited
                        ? "text-amber-400"
                        : "text-muted-foreground/50 hover:text-muted-foreground"
                      }
                      ${!isAuthenticated && "opacity-40 cursor-not-allowed"}
                    `}
                  >
                    <Star className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${meditationIsFavorited ? "fill-amber-400 scale-110" : "hover:scale-110"}`} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {isAuthenticated ? (meditationIsFavorited ? "Remove from favorites" : "Add to favorites") : "Sign in to favorite"}
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>

          {/* Main play button - prominent but soft */}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={togglePlay}
                  className="
                    w-12 h-12 md:w-14 md:h-14 rounded-full
                    bg-gradient-to-br from-[var(--celadon)] to-[var(--celadon-dark)]
                    text-white flex items-center justify-center
                    outline outline-2 outline-[var(--celadon-light)]/30
                    hover:scale-105 active:scale-95
                    transition-all duration-300 ease-out
                  "
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 md:w-6 md:h-6" />
                  ) : (
                    <Play className="w-5 h-5 md:w-6 md:h-6 ml-0.5" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {isPlaying ? "Pause" : "Play"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Action buttons - right side */}
          <TooltipProvider delayDuration={300}>
            {showActionLoading ? (
              <div className="w-9 h-9 md:w-10 md:h-10" />
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLikeClick}
                    disabled={!isAuthenticated}
                    className={`
                      w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center
                      transition-all duration-300 ease-out
                      ${meditationIsLiked
                        ? "text-rose-400"
                        : "text-muted-foreground/50 hover:text-muted-foreground"
                      }
                      ${!isAuthenticated && "opacity-40 cursor-not-allowed"}
                    `}
                  >
                    <Heart className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${meditationIsLiked ? "fill-rose-400 scale-110" : "hover:scale-110"}`} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {isAuthenticated ? (meditationIsLiked ? "Unlike" : "Like") : "Sign in to like"}
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>

        {/* Keywords - hidden on mobile to save space */}
        {meditation.keywords && meditation.keywords.length > 0 && (
          <div className="hidden md:flex flex-wrap justify-center gap-2 mb-4">
            {meditation.keywords.slice(0, 4).map((keyword, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs bg-muted/40 rounded-full text-muted-foreground"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Share and browse - compact footer */}
        <div className="flex items-center justify-center gap-4 md:gap-6 pt-3 md:pt-4 border-t border-border/30">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>Share</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">Share this meditation</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="w-px h-4 bg-border/40" />

          <Link
            href="/library"
            className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span>Explore more</span>
          </Link>
        </div>
      </div>

      {/* Related Meditations */}
      {relatedMeditations.length > 0 && (
        <div className="w-full max-w-xl mt-8 md:mt-12 px-2 md:px-4">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-center">You might also like</h2>
          <div className="grid gap-3 md:gap-4">
            {relatedMeditations.map((related) => (
              <Link
                key={related.id}
                href={`/play/${related.id}`}
                className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 rounded-xl bg-card/50 hover:bg-card/80 border border-border/40 transition-all duration-300 group overflow-hidden"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={related.thumbnail}
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <Play className="w-6 h-6 text-white opacity-80" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm md:text-base truncate group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {related.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

