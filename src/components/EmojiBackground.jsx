import { useEffect, useRef } from 'react'

const EMOJIS = ['😍', '🥰', '🍿', '😋', '🎥']

export default function EmojiBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createEmoji = () => {
      const el = document.createElement('span')
      el.className = 'falling-emoji'
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      el.style.left = Math.random() * 100 + 'vw'
      el.style.fontSize = (Math.random() * 20 + 16) + 'px'
      el.style.animationDuration = (Math.random() * 4 + 4) + 's'
      el.style.opacity = Math.random() * 0.4 + 0.15
      container.appendChild(el)
      el.addEventListener('animationend', () => el.remove())
    }

    const interval = setInterval(createEmoji, 300)
    return () => clearInterval(interval)
  }, [])

  return <div ref={containerRef} className="emoji-bg" />
}
