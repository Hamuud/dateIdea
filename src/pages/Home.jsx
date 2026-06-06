import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page home-page">
      <div className="home-content">
        <h1 className="home-title">
          Invitation to the Cinema <span className="title-emoji">🎬</span>
        </h1>
        <p className="home-subtitle">A special evening awaits you</p>
        <button className="btn btn-hero" onClick={() => navigate('/movies')}>
          START
        </button>
      </div>
    </div>
  )
}
