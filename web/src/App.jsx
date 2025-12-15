import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Camera from './pages/Camera'
import Avatar from './pages/Avatar'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Router basename="/asl-communication-aid/">
      <div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
        <header style={{ marginBottom: 20 }}>
          <h1>ASL Communication Aid</h1>
          <nav style={{ display: 'flex', gap: 12 }}>
            <Link to="/">Home</Link>
            <Link to="/camera">Camera</Link>
            <Link to="/avatar">Avatar</Link>
            <Link to="/settings">Settings</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/avatar" element={<Avatar />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <footer style={{ marginTop: 40, color: '#666' }}>
          <small>Deployment: GitHub Pages — Demo will appear here after merge</small>
        </footer>
      </div>
    </Router>
  )
}