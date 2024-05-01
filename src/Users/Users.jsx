import { useEffect, useState } from 'react';
import User from './User';
import style from './Users.module.css';

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://telegram-testing.glitch.me/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data.reverse());
      });
  }, []);

  return (
    <>
      {users && users.length > 0 ? (
        <div className={style.contentWrapper}>
          <ul className={style.list}>
            {users.map(user => user.id !== '00001' && <User user={user} key={user.id} />)}
          </ul>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </>
  );
};
