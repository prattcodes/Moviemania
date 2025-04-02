import { MediaCard } from "@/components/media-card"
import { getPopularTVShows } from "@/lib/tmdb"

export async function TVShowGrid() {
  const tvShows = await getPopularTVShows()

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
  )
}

