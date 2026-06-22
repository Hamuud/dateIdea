export default function MovieCard({ movie, onTrailer, onBook }) {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title} loading="lazy" />
        ) : (
          <div
            className="poster-placeholder"
            style={{ background: `linear-gradient(135deg, ${movie.color}, #0a0a1a)` }}
          >
            <span className="poster-emoji">🎬</span>
            <span className="poster-title">{movie.title}</span>
          </div>
        )}
        <div className="poster-overlay" />
        {movie.ageLimit && <span className="age-badge">{movie.ageLimit}</span>}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        {movie.titleUA && <p className="movie-title-ua">{movie.titleUA}</p>}
        <span className="movie-genre">{movie.genre}</span>
        <div className="movie-showtimes">
          {movie.showtimes.map((t) => (
            <span key={t} className="showtime-badge">{t}</span>
          ))}
        </div>
        <div className="movie-actions">
          {movie.trailerUrl && (
            <button className="btn btn-outline" onClick={() => onTrailer(movie)}>
              ТРЕЙЛЕР
            </button>
          )}
          <button className="btn btn-primary" onClick={() => onBook(movie)}>
            ЗАБРОНЮВАТИ
          </button>
        </div>
      </div>
    </div>
  )
}
