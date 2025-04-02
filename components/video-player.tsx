"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface VideoPlayerProps {
  type: "movie" | "tv"
  tmdbId: number
  seasonNumber?: number
  episodeNumber?: number
}

export function VideoPlayer({ type, tmdbId, seasonNumber = 1, episodeNumber = 1 }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [embedUrl, setEmbedUrl] = useState("")

  useEffect(() => {
    // Replace {movie_url} with your actual embed URL base
    const movieUrlBase = process.env.NEXT_PUBLIC_MOVIE_URL || "https://your-embed-service.com"

    let url = ""
    if (type === "movie") {
      url = `${movieUrlBase}/embed/movie/${tmdbId}`
    } else if (type === "tv") {
      url = `${movieUrlBase}/embed/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`
    }

    setEmbedUrl(url)
    setIsLoading(true)
  }, [type, tmdbId, seasonNumber, episodeNumber])



  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative aspect-video w-full bg-black/50 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {embedUrl && (
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          title={type === "movie" ? "Movie Player" : "TV Show Player"}
          onLoad={handleIframeLoad}
          className={isLoading ? "opacity-0" : "opacity-100"}
        />
      )}
    </div>
  )
}

