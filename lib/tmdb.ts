// Types for TMDB API responses
export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  overview: string
  vote_average: number
  runtime?: number
  genres?: { id: number; name: string }[]
}

export interface TVShow {
  seasons: never[]
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  overview: string
  vote_average: number
  number_of_seasons: number
  genres?: { id: number; name: string }[]
}

export interface Season {
  id: number
  name: string
  season_number: number
  episode_count: number
  poster_path: string | null
  overview: string
}

export interface Episode {
  id: number
  name: string
  episode_number: number
  season_number: number
  still_path: string | null
  overview: string
  air_date: string
  runtime: number
}

// API key should be stored in environment variables
const API_KEY = process.env.TMDB_API_KEY || "your_tmdb_api_key"
const BASE_URL = "https://api.themoviedb.org/3"

// Helper function for API requests
async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  })

  const url = `${BASE_URL}${endpoint}?${queryParams}`
  
  // Add retry logic for network errors
  const maxRetries = 3;
  let retries = 0;
  
  while (true) {
    try {
      const response = await fetch(url, { next: { revalidate: 3600 } }) // Cache for 1 hour

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status} ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      // Check if we've reached max retries
      if (retries >= maxRetries) {
        console.error(`Failed after ${maxRetries} retries:`, error)
        throw new Error(`Failed to fetch data from TMDB: ${error.message}`)
      }
      
      // If it's a network error like ECONNRESET, retry
      if (error.code === 'ECONNRESET' || error.message?.includes('fetch failed') || 
          (error.cause && error.cause.code === 'ECONNRESET')) {
        retries++;
        console.log(`Retry attempt ${retries} after connection error: ${error.message}`)
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)))
        continue;
      }
      
      // For other errors, just throw
      throw error;
    }
  }
}

// Get trending movies
export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB("/trending/movie/week")
  return data.results
}

// Get trending TV shows
export async function getTrendingTVShows(): Promise<TVShow[]> {
  const data = await fetchFromTMDB("/trending/tv/week")
  return data.results
}

// Add this function to the existing tmdb.ts file
export async function getPopularMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB("/movie/popular")
  return data.results
}

// Add this function to the existing tmdb.ts file
export async function getPopularTVShows(): Promise<TVShow[]> {
  const data = await fetchFromTMDB("/tv/popular")
  return data.results
}

// Search for movies and TV shows
export async function searchMedia(query: string): Promise<{
  movies: Movie[]
  tvShows: TVShow[]
}> {
  const [moviesData, tvShowsData] = await Promise.all([
    fetchFromTMDB("/search/movie", { query }),
    fetchFromTMDB("/search/tv", { query }),
  ])

  return {
    movies: moviesData.results,
    tvShows: tvShowsData.results,
  }
}

// Get movie details
export async function getMovieDetails(movieId: number): Promise<Movie> {
  return fetchFromTMDB(`/movie/${movieId}`, { append_to_response: "credits,similar" })
}

// Get TV show details
export async function getTVShowDetails(tvId: number): Promise<TVShow> {
  return fetchFromTMDB(`/tv/${tvId}`, { append_to_response: "credits,similar" })
}

// Get season details
export async function getSeasonDetails(
  tvId: number,
  seasonNumber: number,
): Promise<{
  episodes: Episode[]
}> {
  return fetchFromTMDB(`/tv/${tvId}/season/${seasonNumber}`)
}

