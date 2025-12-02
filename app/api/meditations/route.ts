import { type NextRequest, NextResponse } from "next/server"
import { getAllMeditations, searchMeditations } from "@/lib/meditations"
import type { MeditationsListResponse, ApiErrorResponse } from "@/types/meditation"

// GET /api/meditations
// Query params:
//   - q: search query (optional) - searches in title and description
//   - limit: number of results (optional, default: all)
//   - offset: pagination offset (optional, default: 0)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const limit = searchParams.get("limit")
    const offset = Number.parseInt(searchParams.get("offset") || "0", 10)

    // Get meditations (filtered if query provided)
    let meditations = query ? searchMeditations(query) : getAllMeditations()

    const totalCount = meditations.length

    // Apply pagination
    if (offset > 0) {
      meditations = meditations.slice(offset)
    }
    if (limit) {
      meditations = meditations.slice(0, Number.parseInt(limit, 10))
    }

    const response: MeditationsListResponse = {
      success: true,
      count: totalCount,
      ...(query && { query }),
      data: meditations,
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
      error: "Failed to fetch meditations",
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
