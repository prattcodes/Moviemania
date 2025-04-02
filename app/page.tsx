import { Suspense } from "react"
import { SearchBar } from "@/components/search-bar"
import { TrendingMovies } from "@/components/trending-movies"
import { TrendingShows } from "@/components/trending-shows"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Movie & TV Player</h1>
        <SearchBar />

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Trending Movies</h2>
          <Suspense fallback={<TrendingMoviesSkeleton />}>
            <TrendingMovies />
          </Suspense>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Popular TV Shows</h2>
          <Suspense fallback={<TrendingShowsSkeleton />}>
            <TrendingShows />
          </Suspense>
        </section>
      </div>
    </main>
  )
}

function TrendingMoviesSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-[225px] w-full rounded-md bg-gray-800" />
            <Skeleton className="h-4 w-full rounded-md bg-gray-800" />
          </div>
        ))}
    </div>
  )
}

function TrendingShowsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-[225px] w-full rounded-md bg-gray-800" />
            <Skeleton className="h-4 w-full rounded-md bg-gray-800" />
          </div>
        ))}
    </div>
  )
}

