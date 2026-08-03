import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary mb-3">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold mb-3">Modern fitness tracking for teams and individuals.</h1>
          <p className="lead text-muted mb-4">
            Log workouts, build leaderboards, and grow stronger with a connected multi-tier experience.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
              Check API Health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://vite.dev/" target="_blank" rel="noreferrer">
              Vite Docs
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 mb-3">App stack</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">React 19 + Vite on port 5173</li>
                <li className="list-group-item px-0">Express + TypeScript API on port 8000</li>
                <li className="list-group-item px-0">MongoDB + Mongoose on port 27017</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
