import { MediaCard } from "@/components/media-card"
import { getTrendingTVShows } from "@/lib/tmdb"

export async function TrendingShows() {
  const shows = await getTrendingTVShows()

  return (
    <div className="carousel">
      {shows.map((show) => (
        <MediaCard
          key={show.id}
          id={show.id}
          title={show.name}
          posterPath={show.poster_path}
          releaseDate={show.first_air_date}
          voteAverage={show.vote_average}
          mediaType="tv"
          className="min-w-[150px] md:min-w-[180px] snap-start"
        />
      ))}
    </div>
  )
}

