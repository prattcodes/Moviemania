import { getSeasonDetails } from "@/lib/tmdb"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: { id: string; seasonNumber: string } }
) {
    try {
        const tvId = Number.parseInt(params.id)
        const seasonNumber = Number.parseInt(params.seasonNumber)

        if (isNaN(tvId) || isNaN(seasonNumber)) {
            return NextResponse.json({ error: "Invalid TV show ID or season number" }, { status: 400 })
        }

        const data = await getSeasonDetails(tvId, seasonNumber)
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error fetching season details:", error)
        return NextResponse.json({ error: "Failed to fetch season details" }, { status: 500 })
    }
}