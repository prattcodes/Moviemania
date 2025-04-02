import { notFound } from "next/navigation"
import { getTVShowDetails } from "@/lib/tmdb"
import { TVShowPageClient } from "./page-client"

export default async function TVShowPage({ params }: { params: { id: string } }) {
  // Ensure params is fully resolved before accessing properties
  const tvId = Number.parseInt(params.id)

  if (isNaN(tvId)) {
    notFound()
  }

  try {
    const tvShow = await getTVShowDetails(tvId)

    // Initialize seasons array
    const seasons = tvShow.seasons || []

    return <TVShowPageClient tvShow={tvShow} initialSeasons={seasons} tvId={tvId} />
  } catch (error) {
    console.error("Error fetching TV show details:", error)
    notFound()
  }
}

