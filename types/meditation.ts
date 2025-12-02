export interface Meditation {
  title: string
  audio_link: string
  thumbnail: string
  description: string
  keywords?: string[]
}

export interface MeditationWithId extends Meditation {
  id: number
}

export interface MeditationsListResponse {
  success: boolean
  count: number
  query?: string
  data: MeditationWithId[]
}

export interface MeditationDetailResponse {
  success: boolean
  data: MeditationWithId
}

export interface ApiErrorResponse {
  success: false
  error: string
  code: string
}
