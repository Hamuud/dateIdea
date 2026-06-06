import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { sendBooking } from '../services/telegram'

export default function Booking() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const movie = state?.movie

  const [form, setForm] = useState({
    showtime: movie?.showtimes[0] || '',
    pickupTime: '',
    name: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  if (!movie) {
    navigate('/movies')
    return null
  }

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')

    try {
      await sendBooking({
        movie: `${movie.title} (${movie.titleUA})`,
        showtime: form.showtime,
        pickupTime: form.pickupTime,
        name: form.name,
        message: form.message,
      })
      navigate('/success')
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="page booking-page">
      <div className="booking-card">
        <h2 className="section-title">Book Your Seat 🎟️</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Movie</label>
            <input type="text" value={`${movie.title} (${movie.titleUA})`} readOnly />
          </div>

          <div className="form-group">
            <label>Showtime</label>
            <select value={form.showtime} onChange={update('showtime')} required>
              {movie.showtimes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Pickup Time</label>
            <input
              type="time"
              value={form.pickupTime}
              onChange={update('pickupTime')}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Message (optional)</label>
            <textarea
              value={form.message}
              onChange={update('message')}
              placeholder="Any special requests?"
              rows={3}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-hero" disabled={sending}>
            {sending ? 'Sending...' : 'SEE YOU SOON ❤️'}
          </button>
        </form>
      </div>
    </div>
  )
}
