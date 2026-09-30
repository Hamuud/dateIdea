import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import staticMovies from '../data/movies'
import MovieCard from '../components/MovieCard'
import TrailerModal from '../components/TrailerModal'

function adaptScrapedMovie(movie, index) {
  return {
    id: movie.id || index + 100,
    title: movie.title,
    titleUA: null,
    genre: movie.genres || '',
    showtimes: (movie.showtimes || []).map(s => s.time),
    poster: movie.poster || null,
    color: ['#1a1a4e', '#2d1b36', '#1b2d1b', '#3d1a1a', '#1a2d3d', '#2d2d1a'][index % 6],
    trailerUrl: movie.trailer || null,
    ageLimit: movie.ageLimit || null,
    detailUrl: movie.detailUrl || null,
    isLive: true,
  }
}

function withCacheBust(url, token) {
  if (!url || !token) return url
  return `${url}${url.includes('?') ? '&' : '?'}v=${token}`
}

export default function Movies() {
  const navigate = useNavigate()
  const refresh = useLocation().state?.refresh
  const [trailerMovie, setTrailerMovie] = useState(null)
  const [liveMovies, setLiveMovies] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)

  useEffect(() => {
    fetch(withCacheBust('./data/movies.json', refresh), refresh ? { cache: 'no-store' } : undefined)
      .then(r => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then(data => {
        if (data.movies && data.movies.length > 0) {
          setLiveMovies(data.movies.map(adaptScrapedMovie))
          setUpdatedAt(data.updatedAt)
        }
      })
      .catch(() => {})
  }, [refresh])

  useEffect(() => {
    if (!liveMovies) return
    try {
      const y = sessionStorage.getItem('moviesScroll')
      if (y) {
        sessionStorage.removeItem('moviesScroll')
        requestAnimationFrame(() => window.scrollTo({ top: Number(y), behavior: 'instant' }))
      }
    } catch {}
  }, [liveMovies])

  const openBooking = (movie) => {
    try {
      sessionStorage.setItem('moviesScroll', String(window.scrollY))
    } catch {}
    window.scrollTo({ top: 0, behavior: 'instant' })
    navigate('/book', { state: { movie } })
  }

  const movies = (liveMovies || staticMovies).map(m => ({ ...m, poster: withCacheBust(m.poster, refresh) }))

  return (
    <div className="page movies-page">
      <h2 className="section-title">Вибери фільм 🍿</h2>
      {updatedAt && (
        <p className="movies-updated">
          Miromax Тернопіль — оновлено {new Date(updatedAt).toLocaleDateString('uk-UA')}
        </p>
      )}
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onTrailer={setTrailerMovie}
            onBook={openBooking}
          />
        ))}
      </div>
      <TrailerModal movie={trailerMovie} onClose={() => setTrailerMovie(null)} />
    </div>
  )
}
