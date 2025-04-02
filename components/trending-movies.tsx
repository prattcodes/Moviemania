import { MediaCard } from "@/components/media-card"
import { getTrendingMovies } from "@/lib/tmdb"

export async function TrendingMovies() {
  const movies = await getTrendingMovies()

  return (
    <div className="carousel">
      {movies.map((movie) => (
        <MediaCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          releaseDate={movie.release_date}
          voteAverage={movie.vote_average}
          mediaType="movie"
          className="min-w-[150px] md:min-w-[180px] snap-start"
        />
      ))}
    </div>
  )
}

