import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface MediaCardProps {
  id: number
  title: string
  posterPath: string | null
  releaseDate?: string
  voteAverage?: number
  mediaType: "movie" | "tv"
  className?: string
}

export function MediaCard({ id, title, posterPath, releaseDate, voteAverage, mediaType, className }: MediaCardProps) {
  const imageUrl = posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : "/placeholder.svg?height=750&width=500"

  const year = releaseDate ? new Date(releaseDate).getFullYear() : null
  const href = `/${mediaType}/${id}`

  return (
    <Link href={href} className={cn("block", className)}>
      <div className="media-card rounded-md overflow-hidden bg-card shadow-md hover:shadow-lg">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
          {voteAverage && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Star className="h-3 w-3 mr-1 text-yellow-400" />
              <span>{voteAverage.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="p-2">
          <h3 className="font-medium text-sm truncate">{title}</h3>
          {year && <p className="text-xs text-muted-foreground">{year}</p>}
        </div>
      </div>
    </Link>
  )
}

