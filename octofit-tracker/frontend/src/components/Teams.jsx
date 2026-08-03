import { useEffect, useState } from 'react';
import { fetchJson } from './api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchJson('teams', 'teams');
        setTeams(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team.id ?? team._id ?? team.name}>
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6">{team.name ?? 'Team'}</h3>
                <p className="text-muted mb-0">{team.description ?? 'Team profile'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Teams;
