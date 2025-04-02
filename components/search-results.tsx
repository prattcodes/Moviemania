import { MediaCard } from "@/components/media-card"
import { searchMedia } from "@/lib/tmdb"

export async function SearchResults({ query }: { query: string }) {
  const { movies, tvShows } = await searchMedia(query)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Movies</h3>
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
        ) : (
          <p className="text-muted-foreground">No movies found</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">TV Shows</h3>
        {tvShows.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tvShows.map((show) => (
              <MediaCard
                key={show.id}
                id={show.id}
                title={show.name}
                posterPath={show.poster_path}
                releaseDate={show.first_air_date}
                voteAverage={show.vote_average}
                mediaType="tv"
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No TV shows found</p>
        )}
      </div>
    </div>
  )
}

