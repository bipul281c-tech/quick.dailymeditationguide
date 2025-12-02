"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Heart } from "lucide-react"
import { TrackList } from "./track-list"
import type { Meditation } from "@/types/meditation"

interface MeditationPlayerProps {
  meditations: Meditation[]
}

export function MeditationPlayer({ meditations }: MeditationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = meditations[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration || 0)
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0
        audio.play()
      } else {
        handleNext()
      }
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [isRepeat, currentTrackIndex])

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
    let nextIndex: number

    if (isShuffle) {
      do {
        nextIndex = Math.floor(Math.random() * meditations.length)
      } while (nextIndex === currentTrackIndex && meditations.length > 1)
    } else {
      nextIndex = (currentTrackIndex + 1) % meditations.length
    }

    setCurrentTrackIndex(nextIndex)
    setCurrentTime(0)
    if (isPlaying && audioRef.current) {
      setTimeout(() => audioRef.current?.play(), 100)
    }
  }

  const handlePrev = () => {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!currentTrack) return null

  return (
    <>
      <div className="relative max-w-4xl mx-auto w-full blur-reveal delay-300">
        <audio ref={audioRef} src={currentTrack.audio_link} preload="metadata" />

        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-stone-100/50 to-transparent pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Cover Art - using thumbnail */}
            <div
              className="aspect-square rounded-2xl bg-stone-100 relative overflow-hidden group cursor-pointer shadow-inner"
              onClick={togglePlay}
            >
              <img
                src={currentTrack.thumbnail || "/placeholder.svg"}
                alt={currentTrack.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-colors duration-500" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-stone-800 fill-stone-800" />
                  ) : (
                    <Play className="w-6 h-6 text-stone-800 fill-stone-800 ml-1" />
                  )}
                </div>
              </div>
            </div>

            {/* Player Controls - simplified info display */}
            <div className="flex flex-col h-full justify-between py-2">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold tracking-wider text-stone-400 uppercase">Now Playing</span>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                  </button>
                </div>
                <h2 className="text-2xl md:text-3xl font-medium text-stone-800 tracking-tight mb-3 line-clamp-2">
                  {currentTrack.title}
                </h2>
                <p className="text-stone-400 text-sm line-clamp-3 mb-4">{currentTrack.description}</p>
              </div>

              <div className="space-y-6">
                {/* Progress */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 audio-slider"
                  />
                  <div className="flex justify-between text-xs font-medium text-stone-400 tabular-nums">
                    <span>{formatTime(currentTime)}</span>
                    <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setIsShuffle(!isShuffle)}
                    className={`p-2 transition-colors ${isShuffle ? "text-stone-800" : "text-stone-400 hover:text-stone-600"}`}
                  >
                    <Shuffle className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-6">
                    <button onClick={handlePrev} className="text-stone-600 hover:text-stone-900 transition-colors">
                      <SkipBack className="w-6 h-6 fill-stone-600/20" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="w-16 h-16 rounded-full bg-stone-800 text-stone-50 flex items-center justify-center hover:bg-stone-700 shadow-xl shadow-stone-200 transition-all duration-300 transform hover:scale-105"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current ml-1" />
                      )}
                    </button>

                    <button onClick={handleNext} className="text-stone-600 hover:text-stone-900 transition-colors">
                      <SkipForward className="w-6 h-6 fill-stone-600/20" />
                    </button>
                  </div>

                  <button
                    onClick={() => setIsRepeat(!isRepeat)}
                    className={`p-2 transition-colors ${isRepeat ? "text-stone-800" : "text-stone-400 hover:text-stone-600"}`}
                  >
                    <Repeat className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-8 left-4 right-4 h-12 bg-stone-400/20 blur-2xl rounded-[100%] -z-10" />
      </div>

      {/* Track list - using index-based selection */}
      <TrackList
        meditations={meditations}
        currentTrackIndex={currentTrackIndex}
        isPlaying={isPlaying}
        onTrackSelect={handleTrackSelect}
      />
    </>
  )
}
