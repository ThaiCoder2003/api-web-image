import './App.css'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import PhotosList from './components/PhotosList'
import PhotoDetail from './components/PhotoDetail'

export default function App() {
  return (
    <div>
      <header className="app-header">
        <h1><Link to="/photos">Picsum Gallery</Link></h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/photos" replace />} />
          <Route path="/photos" element={<PhotosList />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
        </Routes>
      </main>
    </div>
  )
}
