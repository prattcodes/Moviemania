"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { VideoPlayer } from "@/components/video-player"
import { formatRuntime } from "@/lib/utils"
import { Star, Calendar, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TVShow, Episode, Season } from "@/lib/tmdb"

interface TVShowPageClientProps {
    tvShow: TVShow
    initialSeasons: Season[]
    tvId: number
}

export function TVShowPageClient({ tvShow, initialSeasons, tvId }: TVShowPageClientProps) {
    const [loading, setLoading] = useState(false)
    const [selectedSeason, setSelectedSeason] = useState<number>(initialSeasons[0]?.season_number || 1)
    const [selectedEpisode, setSelectedEpisode] = useState(1)
    const [episodes, setEpisodes] = useState<Episode[]>([])
    const [seasons] = useState<Season[]>(initialSeasons)
    const [episodeNumbers, setEpisodeNumbers] = useState<number[]>([])

    // Fetch episodes when selected season changes
    useEffect(() => {
        async function fetchEpisodes() {
            setLoading(true)
            try {
                const response = await fetch(`/api/tv/${tvId}/season/${selectedSeason}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch episodes')
                }
                const data = await response.json()
                setEpisodes(data.episodes || [])

                // Generate episode numbers array for the dropdown
                if (data.episodes && data.episodes.length > 0) {
                    setEpisodeNumbers(Array.from({ length: data.episodes.length }, (_, i) => i + 1))
                    setSelectedEpisode(1) // Reset to first episode when season changes
                } else {
                    setEpisodeNumbers([])
                }
            } catch (err) {
                console.error("Error fetching episodes:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchEpisodes()
    }, [tvId, selectedSeason])

    const backdropUrl = tvShow.backdrop_path ? `https://image.tmdb.org/t/p/original${tvShow.backdrop_path}` : null

    const posterUrl = tvShow.poster_path
        ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
        : "/placeholder.svg?height=750&width=500"

    return (
        <main className="min-h-screen bg-black text-white">
            {backdropUrl && (
                <div className="relative h-[40vh] w-full">
                    <Image src={backdropUrl || "/placeholder.svg"} alt={tvShow.name} fill priority className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
            )}

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                        <Image src={posterUrl || "/placeholder.svg"} alt={tvShow.name} fill className="object-cover" />
                    </div>

                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">{tvShow.name}</h1>

                        <div className="flex flex-wrap gap-4 mt-4 text-sm">
                            {tvShow.first_air_date && (
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>{new Date(tvShow.first_air_date).getFullYear()}</span>
                                </div>
                            )}

                            {tvShow.number_of_seasons && (
                                <div className="flex items-center">
                                    <span>
                                        {tvShow.number_of_seasons} Season{tvShow.number_of_seasons > 1 ? "s" : ""}
                                    </span>
                                </div>
                            )}

                            {tvShow.vote_average > 0 && (
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                                    <span>{tvShow.vote_average.toFixed(1)}</span>
                                </div>
                            )}
                        </div>

                        {tvShow.genres && tvShow.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {tvShow.genres.map((genre: any) => (
                                    <span
                                        key={genre.id}
                                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <p className="mt-6 text-muted-foreground">{tvShow.overview}</p>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Episodes</h2>

                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="w-full sm:w-48">
                                        <label className="block text-sm font-medium mb-2">Season</label>
                                        <Select
                                            value={selectedSeason.toString()}
                                            onValueChange={(value) => setSelectedSeason(Number.parseInt(value))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Season" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {seasons.map((season) => (
                                                    <SelectItem key={season.id || season.season_number} value={season.season_number.toString()}>
                                                        {season.name || `Season ${season.season_number}`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="w-full sm:w-48">
                                        <label className="block text-sm font-medium mb-2">Episode</label>
                                        <Select
                                            value={selectedEpisode.toString()}
                                            onValueChange={(value) => setSelectedEpisode(Number.parseInt(value))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Episode" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {episodeNumbers.map((episodeNum) => (
                                                    <SelectItem key={episodeNum} value={episodeNum.toString()}>
                                                        Episode {episodeNum}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Watch Episode</h3>
                                    <VideoPlayer type="tv" tmdbId={tvId} seasonNumber={selectedSeason} episodeNumber={selectedEpisode} />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Episodes</h3>

                                    {loading ? (
                                        <div className="space-y-4">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="flex gap-4">
                                                    <Skeleton className="h-24 w-40 rounded-md bg-gray-800" />
                                                    <div className="space-y-2 flex-1">
                                                        <Skeleton className="h-4 w-3/4 rounded-md bg-gray-800" />
                                                        <Skeleton className="h-4 w-1/2 rounded-md bg-gray-800" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : episodes.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {episodes.map((episode) => (
                                                <Card
                                                    key={episode.id}
                                                    className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] h-full ${selectedEpisode === episode.episode_number ? "ring-2 ring-primary" : "hover:bg-zinc-900"}`}
                                                    onClick={() => setSelectedEpisode(episode.episode_number)}
                                                >
                                                    <CardContent className="p-0 overflow-hidden flex flex-col h-full">
                                                        <div className="relative aspect-video w-full overflow-hidden">
                                                            <div className="absolute top-2 left-2 z-10 bg-black/80 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                                                                {episode.episode_number}
                                                            </div>
                                                            <Image
                                                                src={
                                                                    episode.still_path
                                                                        ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
                                                                        : "/placeholder.svg?height=300&width=500"
                                                                }
                                                                alt={episode.name}
                                                                fill
                                                                className="object-cover transition-all duration-300 hover:scale-105"
                                                            />
                                                            {selectedEpisode === episode.episode_number && (
                                                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                                    <div className="bg-primary/90 rounded-full p-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="p-3 flex-1 flex flex-col">
                                                            <div className="flex justify-between items-start gap-1 mb-1">
                                                                <h4 className="font-medium text-sm truncate">
                                                                    {episode.name}
                                                                </h4>
                                                                {episode.runtime && (
                                                                    <div className="text-xs text-muted-foreground flex items-center flex-shrink-0">
                                                                        <Clock className="h-3 w-3 mr-1" />
                                                                        {formatRuntime(episode.runtime)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                                                {episode.overview || "No description available."}
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">No episodes available for this season.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}