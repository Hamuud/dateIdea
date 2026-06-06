import { HashRouter, Routes, Route } from 'react-router-dom'
import EmojiBackground from './components/EmojiBackground'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Booking from './pages/Booking'
import Success from './pages/Success'

export default function App() {
  return (
    <HashRouter>
      <EmojiBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </HashRouter>
  )
}
