import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"
import { SearchBar } from "@/components/search-bar"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams?.q || ""

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        <SearchBar />

        {query ? (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Results for "{query}"</h2>
            <Suspense fallback={<SearchResultsSkeleton />}>
              <SearchResults query={query} />
            </Suspense>
          </div>
        ) : (
          <div className="mt-8 text-center text-muted-foreground">Enter a search term to find movies and TV shows</div>
        )}
      </div>
    </main>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Movies</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-[225px] w-full rounded-md bg-gray-800" />
                <Skeleton className="h-4 w-full rounded-md bg-gray-800" />
              </div>
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">TV Shows</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-[225px] w-full rounded-md bg-gray-800" />
                <Skeleton className="h-4 w-full rounded-md bg-gray-800" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

