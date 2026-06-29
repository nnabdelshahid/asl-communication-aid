import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Camera from './pages/Camera';
import Avatar from './pages/Avatar';
import Settings from './pages/Settings';

export default function App() {
  const basename = window.location.pathname.startsWith('/asl-communication-aid') ? '/asl-communication-aid' : '/';

  return (
    <Router basename={basename}>
      <div className="app-shell">
        <header className="site-header">
          <Link className="brand" to="/">
            <span>ASL</span>
            Communication Aid
          </Link>
          <nav aria-label="Primary navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/camera">Camera</NavLink>
            <NavLink to="/avatar">Avatar</NavLink>
            <NavLink to="/settings">Settings</NavLink>
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

        <footer>
          <span>Demo recognition supports A, L, and V while the full ML model is trained.</span>
        </footer>
      </div>
    </Router>
  );
}
