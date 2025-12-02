"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Heart, X, MoreHorizontal } from "lucide-react"
import type { Meditation } from "@/types/meditation"

interface MeditationLibraryProps {
  meditations: Meditation[]
}

export function MeditationLibrary({ meditations }: MeditationLibraryProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = currentTrackIndex !== null ? meditations[currentTrackIndex] : null

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration || 0)
    const handleEnded = () => {
      handleNext()
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentTrackIndex])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleNext = () => {
    if (currentTrackIndex === null) return
    const nextIndex = (currentTrackIndex + 1) % meditations.length
    setCurrentTrackIndex(nextIndex)
    setCurrentTime(0)
    if (isPlaying && audioRef.current) {
      setTimeout(() => audioRef.current?.play(), 100)
    }
  }

  const handlePrev = () => {
    if (currentTrackIndex === null) return
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      return
    }
    const prevIndex = (currentTrackIndex - 1 + meditations.length) % meditations.length
    setCurrentTrackIndex(prevIndex)
    setCurrentTime(0)
    if (isPlaying && audioRef.current) {
      setTimeout(() => audioRef.current?.play(), 100)
    }
  }

  const handleTrackSelect = (index: number) => {
    if (index === currentTrackIndex) {
      togglePlay()
    } else {
      setCurrentTrackIndex(index)
      setCurrentTime(0)
      setIsPlaying(true)
      setTimeout(() => audioRef.current?.play(), 100)
    }
  }

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setIsPlaying(false)
    setCurrentTrackIndex(null)
    setCurrentTime(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <>
      {/* Hidden audio element */}
      {currentTrack && (
        <audio ref={audioRef} src={currentTrack.audio_link} preload="metadata" />
      )}

      {/* Meditation Grid */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">Meditation Library</h2>
            <p className="text-muted-foreground mt-1">Choose a session to begin your journey</p>
          </div>
          <span className="text-sm font-medium text-muted-foreground">{meditations.length} sessions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {meditations.map((track, index) => {
            const isCurrentTrack = currentTrackIndex === index

            return (
              <div
                key={index}
                className={`group relative bg-card/60 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-celadon/10 hover:-translate-y-1 ${
                  isCurrentTrack
                    ? "border-celadon ring-2 ring-celadon/20"
                    : "border-border/60 hover:border-celadon/50"
                }`}
                onClick={() => handleTrackSelect(index)}
              >
                {/* Thumbnail */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={track.thumbnail || "/placeholder.svg"}
                    alt={track.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCurrentTrack && isPlaying 
                        ? "bg-primary text-primary-foreground scale-100 opacity-100" 
                        : "bg-card/90 text-foreground scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    }`}>
                      {isCurrentTrack && isPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current ml-1" />
                      )}
                    </div>
                  </div>
                </div>

