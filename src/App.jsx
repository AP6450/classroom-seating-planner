import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Sociogram from './pages/Sociogram'
import SeatingPlan from './pages/SeatingPlan'
import { Network, LayoutGrid } from 'lucide-react'

function NavBar() {
  const location = useLocation()
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-6 shadow-sm">
      <span className="font-bold text-lg text-blue-700 mr-4">Classroom Seating Planner</span>
      <Link
        to="/"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          location.pathname === '/' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Network size={16} /> Sociogram
      </Link>
      <Link
        to="/seating"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          location.pathname === '/seating' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <LayoutGrid size={16} /> Seating Plan
      </Link>
    </nav>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Routes>
        <Route path="/" element={<Sociogram />} />
        <Route path="/seating" element={<SeatingPlan />} />
      </Routes>
    </div>
  )
}
