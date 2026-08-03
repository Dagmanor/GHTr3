import { useEffect, useState } from 'react';

const getUsersEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';
};

const normalizeUsers = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.users)) return payload.users;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.items)) return payload.items;
  return [];
};

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(getUsersEndpoint(), { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        const data = await response.json();
        setUsers(normalizeUsers(data));
      } catch (err) {
        setError(err.message);
      }
    };

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6" key={user.id ?? user._id ?? user.name}>
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6">{user.name ?? user.username ?? 'User'}</h3>
                <p className="text-muted mb-0">{user.role ?? user.email ?? 'Member'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;
