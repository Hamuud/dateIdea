import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import movies from '../data/movies'
import MovieCard from '../components/MovieCard'
import TrailerModal from '../components/TrailerModal'

export default function Movies() {
  const navigate = useNavigate()
  const [trailerMovie, setTrailerMovie] = useState(null)

  return (
    <div className="page movies-page">
      <h2 className="section-title">Вибери фільм 🍿</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onTrailer={setTrailerMovie}
            onBook={(m) => navigate('/book', { state: { movie: m } })}
          />
        ))}
      </div>
      <TrailerModal movie={trailerMovie} onClose={() => setTrailerMovie(null)} />
    </div>
  )
}
