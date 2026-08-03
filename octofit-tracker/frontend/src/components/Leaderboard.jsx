import { useEffect, useState } from 'react';
import { fetchJson } from './api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchJson('leaderboard', 'leaderboard');
        setEntries(data);
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
