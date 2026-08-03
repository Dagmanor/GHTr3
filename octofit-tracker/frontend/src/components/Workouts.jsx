import { useEffect, useState } from 'react';
import { fetchJson } from './api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchJson('workouts', 'workouts');
        setWorkouts(data);
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
