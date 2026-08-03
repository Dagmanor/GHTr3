import { useEffect, useState } from 'react';
import { fetchJson } from './api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchJson('users', 'users');
        setUsers(data);
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
