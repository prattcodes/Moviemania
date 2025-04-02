import { Suspense } from "react"
import { TVShowGrid } from "@/components/tv-show-grid"
import { Skeleton } from "@/components/ui/skeleton"

export default function TVShowsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">TV Shows</h1>

        <Suspense fallback={<TVShowGridSkeleton />}>
          <TVShowGrid />
        </Suspense>
      </div>
    </main>
  )
}

function TVShowGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array(15)
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

