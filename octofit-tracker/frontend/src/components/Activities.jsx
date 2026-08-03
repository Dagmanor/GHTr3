import { useEffect, useState } from 'react';
import { fetchJson } from './api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchJson('activities', 'activities');
        setActivities(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity.id ?? activity._id ?? activity.name ?? activity.type}>
            <strong>{activity.type ?? 'Activity'}</strong>
            <div className="text-muted small">
              {activity.durationMinutes ? `${activity.durationMinutes} min` : ''}
              {activity.calories ? ` • ${activity.calories} kcal` : ''}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
