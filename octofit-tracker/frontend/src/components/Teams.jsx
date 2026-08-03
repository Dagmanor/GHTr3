import { useEffect, useState } from 'react';

const getTeamsEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';
};

const normalizeTeams = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.teams)) return payload.teams;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.items)) return payload.items;
  return [];
};

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(getTeamsEndpoint(), { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        const data = await response.json();
        setTeams(normalizeTeams(data));
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
