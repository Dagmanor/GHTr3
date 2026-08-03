import { useEffect, useState } from 'react';

const getLeaderboardEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';
};

const normalizeLeaderboard = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.leaderboard)) return payload.leaderboard;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.items)) return payload.items;
  return [];
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(getLeaderboardEndpoint(), { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        const data = await response.json();
        setEntries(normalizeLeaderboard(data));
      } catch (err) {
        setError(err.message);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry.id ?? entry._id ?? entry.name ?? entry.userName}>
            <strong>{entry.name ?? entry.userName ?? 'User'}</strong>
            <span className="float-end">{entry.score ?? entry.points ?? '—'}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;
