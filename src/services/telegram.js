const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

export async function sendBooking({ movie, showtime, pickupTime, name, message }) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram configuration missing. Set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in .env')
  }

  const text = [
    '🎬 Cinema Invitation',
    '',
    `🎥 Movie: ${movie}`,
    `🕐 Showtime: ${showtime}`,
    `🚗 Pickup Time: ${pickupTime}`,
    `👤 Name: ${name}`,
    message ? `💬 Message: ${message}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.description || 'Failed to send message')
  }

  return response.json()
}
