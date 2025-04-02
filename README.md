# Movie & TV Player

A modern web application for browsing and streaming movies and TV shows, built with Next.js and the TMDB API.

![Movie & TV Player](https://image.tmdb.org/t/p/original/placeholder.jpg)

## Features

- **Browse trending movies and popular TV shows**
- **Search functionality** for finding specific content
- **Detailed movie and TV show pages** with descriptions, ratings, and metadata
- **TV show season and episode navigation**
- **Video player integration** for streaming content
- **Responsive design** that works on desktop and mobile devices
- **Dark mode** for comfortable viewing
- **Favorites system** to save your preferred content

## Technologies Used

- **Next.js 15** - React framework with server-side rendering and API routes
- **TypeScript** - For type safety and better developer experience
- **Tailwind CSS** - For responsive and customizable styling
- **Radix UI** - Accessible UI components
- **TMDB API** - For fetching movie and TV show data
- **React Hook Form** - For form handling

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or pnpm
- TMDB API key (get one from [themoviedb.org](https://www.themoviedb.org/documentation/api))

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/movie-player.git
   cd movie-player
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Create a `.env` file in the root directory with your TMDB API key
   ```
   TMDB_API_KEY=your_tmdb_api_key
   NEXT_PUBLIC_MOVIE_URL=your_embed_service_url (optional)
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

- **Home Page**: Browse trending movies and popular TV shows
- **Search**: Use the search bar to find specific movies or TV shows
- **Movie Details**: Click on a movie to view its details and watch it
- **TV Show Details**: Click on a TV show to view seasons and episodes
- **Favorites**: Save your favorite content for quick access

## Test Examples

Try these examples to quickly test the application:

### Movies
- [Mickey 17](http://localhost:3000/movie/696506) - Upcoming sci-fi film
- [Fight Club](http://localhost:3000/movie/550) - Classic thriller
- [Inception](http://localhost:3000/movie/27205) - Mind-bending sci-fi

### TV Shows
- [House MD](http://localhost:3000/tv/1408) - Medical drama series
- [Breaking Bad](http://localhost:3000/tv/1396) - Crime drama series
- [Stranger Things](http://localhost:3000/tv/66732) - Sci-fi horror series

## Building for Production

```bash
npm run build
npm start
# or
pnpm build
pnpm start
```

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - Reusable UI components
- `/lib` - Utility functions and API clients
- `/public` - Static assets
- `/styles` - Global styles

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie and TV show data
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components