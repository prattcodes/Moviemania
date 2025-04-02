import { notFound } from "next/navigation"
import { getMovieDetails } from "@/lib/tmdb"
import { MoviePageClient } from "./page-client"

export default async function MoviePage({ params }: { params: { id: string } }) {
  // Ensure params is fully resolved before accessing properties
  const movieId = Number.parseInt(params.id)

  if (isNaN(movieId)) {
    notFound()
  }

  try {
    // Fetch movie data on the server
    const movie = await getMovieDetails(movieId)

    // Serialize the data to prevent hydration mismatches
    // This ensures consistent data between server and client
    const serializedMovie = JSON.parse(JSON.stringify(movie))

    // Pass the serialized movie data to the client component
    return <MoviePageClient movie={serializedMovie} movieId={movieId} />
  } catch (error) {
    console.error("Error fetching movie details:", error)
    notFound()
  }
}

