"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"

interface TrackingState {
  likedMeditations: Set<number>
  favoriteMeditations: Set<number>
  loading: boolean
}

export function useMeditationTracking() {
  const { user } = useAuth()
  const [state, setState] = useState<TrackingState>({
    likedMeditations: new Set(),
    favoriteMeditations: new Set(),
    loading: true,
  })
  const currentHistoryIdRef = useRef<string | null>(null)

  // Fetch user's likes and favorites on mount
  useEffect(() => {
    if (!user) {
      setState({ likedMeditations: new Set(), favoriteMeditations: new Set(), loading: false })
      return
    }

    const fetchUserData = async () => {
      const supabase = createClient()
      
      const [likesResult, favoritesResult] = await Promise.all([
        supabase.from("meditation_likes").select("meditation_id").eq("user_id", user.id),
        supabase.from("meditation_favorites").select("meditation_id").eq("user_id", user.id),
      ])

      setState({
        likedMeditations: new Set(likesResult.data?.map((l) => l.meditation_id) || []),
        favoriteMeditations: new Set(favoritesResult.data?.map((f) => f.meditation_id) || []),
        loading: false,
      })
    }

    fetchUserData()
  }, [user])

  const toggleLike = useCallback(async (meditationId: number): Promise<boolean> => {
    if (!user) return false
    
    const supabase = createClient()
    const isLiked = state.likedMeditations.has(meditationId)

    if (isLiked) {
      const { error } = await supabase
        .from("meditation_likes")
        .delete()
        .eq("user_id", user.id)
        .eq("meditation_id", meditationId)

      if (!error) {
        setState((prev) => {
          const newLikes = new Set(prev.likedMeditations)
          newLikes.delete(meditationId)
          return { ...prev, likedMeditations: newLikes }
        })
        return false
      }
    } else {
      const { error } = await supabase
        .from("meditation_likes")
        .insert({ user_id: user.id, meditation_id: meditationId })

      if (!error) {
        setState((prev) => {
          const newLikes = new Set(prev.likedMeditations)
          newLikes.add(meditationId)
          return { ...prev, likedMeditations: newLikes }
        })
        return true
      }
    }
    return isLiked
  }, [user, state.likedMeditations])

  const toggleFavorite = useCallback(async (meditationId: number): Promise<boolean> => {
    if (!user) return false
    
    const supabase = createClient()
    const isFavorited = state.favoriteMeditations.has(meditationId)

    if (isFavorited) {
      const { error } = await supabase
        .from("meditation_favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("meditation_id", meditationId)

      if (!error) {
        setState((prev) => {
          const newFavorites = new Set(prev.favoriteMeditations)
          newFavorites.delete(meditationId)
          return { ...prev, favoriteMeditations: newFavorites }
        })
        return false
      }
    } else {
      const { error } = await supabase
        .from("meditation_favorites")
        .insert({ user_id: user.id, meditation_id: meditationId })

      if (!error) {
        setState((prev) => {
          const newFavorites = new Set(prev.favoriteMeditations)
          newFavorites.add(meditationId)
          return { ...prev, favoriteMeditations: newFavorites }
        })
        return true
      }
    }
    return isFavorited
  }, [user, state.favoriteMeditations])

  const recordPlay = useCallback(async (meditationId: number, durationSeconds: number) => {
    if (!user) return null

    const supabase = createClient()

    // Record play in user's listening history
    const { data, error } = await supabase
      .from("listening_history")
      .insert({
        user_id: user.id,
        meditation_id: meditationId,
        duration_seconds: durationSeconds,
        progress_seconds: 0,
        completed: false,
      })
      .select()
      .single()

    // Increment global play count for this meditation
    await supabase.rpc("increment_play_count", { p_meditation_id: meditationId })

    if (!error && data) {
      currentHistoryIdRef.current = data.id
      return data.id
    }
    return null
  }, [user])

  const updateProgress = useCallback(async (progressSeconds: number, completed: boolean = false) => {
    if (!user || !currentHistoryIdRef.current) return

    const supabase = createClient()
    await supabase
      .from("listening_history")
      .update({ progress_seconds: progressSeconds, completed })
      .eq("id", currentHistoryIdRef.current)
  }, [user])

  const isLiked = useCallback((meditationId: number) => state.likedMeditations.has(meditationId), [state.likedMeditations])
  const isFavorited = useCallback((meditationId: number) => state.favoriteMeditations.has(meditationId), [state.favoriteMeditations])

  return {
    ...state, toggleLike, toggleFavorite, recordPlay, updateProgress, isLiked, isFavorited,
    isAuthenticated: !!user,
  }
}

