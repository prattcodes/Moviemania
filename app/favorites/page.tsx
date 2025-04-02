"use client"

import { useState, useEffect } from "react"
import { MediaCard } from "@/components/media-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface FavoriteItem {
  id: number
  title: string
  posterPath: string | null
  releaseDate?: string
  voteAverage?: number
  mediaType: "movie" | "tv"
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [activeTab, setActiveTab] = useState<"all" | "movies" | "tvshows">("all")

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Error parsing favorites:", error)
      }
    }
  }, [])

  const handleRemoveFavorite = (id: number, mediaType: "movie" | "tv") => {
    const updatedFavorites = favorites.filter((item) => !(item.id === id && item.mediaType === mediaType))
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }

  const filteredFavorites = favorites.filter((item) => {
    if (activeTab === "all") return true
    if (activeTab === "movies") return item.mediaType === "movie"
    if (activeTab === "tvshows") return item.mediaType === "tv"
    return true
  })

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Favorites</h1>

        <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="tvshows">TV Shows</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {renderContent()}
          </TabsContent>
          <TabsContent value="movies" className="mt-0">
            {renderContent()}
          </TabsContent>
          <TabsContent value="tvshows" className="mt-0">
            {renderContent()}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )

  function renderContent() {
    if (filteredFavorites.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No favorites added yet</p>
          <p className="text-sm text-muted-foreground">
            Browse movies and TV shows and click the heart icon to add them to your favorites
          </p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredFavorites.map((item) => (
          <div key={`${item.mediaType}-${item.id}`} className="relative group">
            <MediaCard
              id={item.id}
              title={item.title}
              posterPath={item.posterPath}
              releaseDate={item.releaseDate}
              voteAverage={item.voteAverage}
              mediaType={item.mediaType}
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveFavorite(item.id, item.mediaType)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    )
  }
}

