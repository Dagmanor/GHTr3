import { useEffect, useState } from 'react';

const getWorkoutsEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';
};

const normalizeWorkouts = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.workouts)) return payload.workouts;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.items)) return payload.items;
  return [];
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(getWorkoutsEndpoint(), { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        const data = await response.json();
        setWorkouts(normalizeWorkouts(data));
      } catch (err) {
        setError(err.message);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout.id ?? workout._id ?? workout.name ?? workout.type}>
            <strong>{workout.name ?? workout.type ?? 'Workout'}</strong>
            <div className="text-muted small">
              {workout.description ?? 'Planned session'}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
