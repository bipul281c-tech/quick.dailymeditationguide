import { type NextRequest, NextResponse } from "next/server"
import { getMeditationById } from "@/lib/meditations"
import type { MeditationDetailResponse, ApiErrorResponse } from "@/types/meditation"

// GET /api/meditations/[id]
// Returns a single meditation by its ID (index)
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const meditationId = Number.parseInt(id, 10)

    if (isNaN(meditationId)) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: "Invalid meditation ID",
        code: "INVALID_ID",
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const meditation = getMeditationById(meditationId)

    if (!meditation) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: "Meditation not found",
        code: "NOT_FOUND",
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    const response: MeditationDetailResponse = {
      success: true,
      data: meditation,
    }

    return NextResponse.json(response, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
  } catch (error) {
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: "Failed to fetch meditation",
      code: "FETCH_ERROR",
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
