import { MediaCard } from "@/components/media-card"
import { getPopularMovies } from "@/lib/tmdb"

export async function MovieGrid() {
  const movies = await getPopularMovies()

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MediaCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          releaseDate={movie.release_date}
          voteAverage={movie.vote_average}
          mediaType="movie"
        />
      ))}
    </div>
  )
}

