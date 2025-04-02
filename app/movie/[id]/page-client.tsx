"use client"

import { useState } from "react"
import Image from "next/image"
import { VideoPlayer } from "@/components/video-player"
import { formatRuntime } from "@/lib/utils"
import { Star, Calendar, Clock } from "lucide-react"

interface MoviePageClientProps {
    movie: any
    movieId: number
}

export function MoviePageClient({ movie, movieId }: MoviePageClientProps) {
    const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder.svg?height=750&width=500"

    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null

    return (
        <main className="min-h-screen bg-black text-white">
            {backdropUrl && (
                <div className="relative h-[40vh] w-full">
                    <Image src={backdropUrl} alt={movie.title} fill priority className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
            )}

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                        <Image src={posterUrl} alt={movie.title} fill className="object-cover" />
                    </div>

                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>

                        <div className="flex flex-wrap gap-4 mt-4 text-sm">
                            {releaseYear && (
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>{releaseYear}</span>
                                </div>
                            )}

                            {movie.runtime && (
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>{formatRuntime(movie.runtime)}</span>
                                </div>
                            )}

                            {movie.vote_average > 0 && (
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                                    <span>{movie.vote_average.toFixed(1)}</span>
                                </div>
                            )}
                        </div>

                        {movie.genres && movie.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {movie.genres.map((genre: any) => (
                                    <span
                                        key={genre.id}
                                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <p className="mt-6 text-muted-foreground">{movie.overview}</p>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Watch Movie</h2>
                            <VideoPlayer type="movie" tmdbId={movieId} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}