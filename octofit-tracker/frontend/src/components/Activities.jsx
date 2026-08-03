import { useEffect, useState } from 'react';

const getActivitiesEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';
};

const normalizeActivities = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.activities)) return payload.activities;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.items)) return payload.items;
  return [];
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(getActivitiesEndpoint(), { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        const data = await response.json();
        setActivities(normalizeActivities(data));
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
