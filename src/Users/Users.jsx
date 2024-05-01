import { useEffect, useState } from 'react';
import User from './User';
// import style from './Users.module.scss';

export const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('https://telegram-testing.glitch.me/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px'}}>Пользователи</h2>
      <ul>
        {users.map(
          user =>
            user.id !== '00001' && (
              <li key={user.id} style={{ marginBottom: '20px'}}>
                <User user={user} />
              </li>
            )
        )}
      </ul>
    </div>
  );
};
