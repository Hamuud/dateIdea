import { useNavigate } from 'react-router-dom'
import sticker from '../assets/sticker.webm'

export default function Success() {
  const navigate = useNavigate()

  return (
    <div className="page success-page">
      <div className="success-content">
        <h1 className="success-title">Чао ПЕРСІК, ДАЗРЕВАЙ</h1>
        <video className="success-gif" autoPlay loop muted playsInline>
          <source src={sticker} type="video/webm" />
        </video>
        <button className="btn btn-hero" onClick={() => navigate('/')}>
          На головну сторінку
        </button>
      </div>
    </div>
  )
}
