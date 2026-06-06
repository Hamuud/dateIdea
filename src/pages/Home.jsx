import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function randomPos() {
  return {
    x: Math.random() * (window.innerWidth - 120),
    y: Math.random() * (window.innerHeight - 50),
  }
}

export default function Home() {
  const navigate = useNavigate()
  const [noPos, setNoPos] = useState(null)

  const runAway = useCallback(() => {
    setNoPos(randomPos())
  }, [])

  return (
    <div className="page home-page">
      <div className="home-content">
        <h1 className="home-title">
          Ми ж йдемо в кіно? <span className="title-emoji">🎬</span>
        </h1>
        <div className="home-buttons">
          <button className="btn btn-hero" onClick={() => navigate('/movies')}>
            ТАК
          </button>
          <button
            className="btn btn-no"
            style={
              noPos
                ? { position: 'fixed', left: noPos.x, top: noPos.y, zIndex: 999 }
                : undefined
            }
            onMouseEnter={runAway}
            onTouchStart={runAway}
            onClick={runAway}
            tabIndex={-1}
          >
            НІ
          </button>
        </div>
      </div>
    </div>
  )
}
