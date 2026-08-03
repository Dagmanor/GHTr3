import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/leaderboard', label: 'Leaderboard' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return (
    <main className="container py-5">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <p className="text-uppercase fw-semibold text-primary mb-2">OctoFit Tracker</p>
              <h1 className="h3 fw-bold mb-3">Multi-tier fitness experience</h1>
              <p className="text-muted">
                Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs, or leave it unset to use localhost.
              </p>
              <div className="d-grid gap-2 mt-4">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => `btn btn-outline-primary text-start ${isActive ? 'active' : ''}`}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <div className="mt-4 small text-muted">
                API base: {codespaceName ? `https://${codespaceName}-8000.app.github.dev/api` : 'http://localhost:8000/api'}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <Routes>
                <Route path="/" element={<div><h2 className="h4">Overview</h2><p className="text-muted">Track progress, compare teams, and review activity summaries from a single app shell.</p></div>} />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
