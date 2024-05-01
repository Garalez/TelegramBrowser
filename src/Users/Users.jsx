import { useEffect, useState } from 'react';
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
  console.log(users);
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>{user.name}</p>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
            <p>{user.phoneNumber}</p>
            <p>{user.rub}</p>
            <p>{user.bit}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
