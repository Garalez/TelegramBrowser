import { useEffect, useState } from 'react';
import Prealoader from '../Preloader';
import User from './User';
import style from './Users.module.css';

const tg = window.Telegram.WebApp;

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [dataFetching, setDataFetching] = useState(false);

  useEffect(() => {
    setDataFetching(true);
    fetch('https://force-capital.glitch.me/users-admin')
      .then(response => response.json())
      .then(data => {
        setUsers(data.reverse());
        setTimeout(() => {
          tg.expand();
          setDataFetching(false);
        }, 100);
      });
  }, []);

  return (
    <>
      {dataFetching ? (
        <Prealoader color={'white'} />
      ) : (
        <div className={style.contentWrapper}>
          <ul className={style.list}>
            {users.map(user => user.id !== '00001' && <User user={user} key={user.id} />)}
          </ul>
        </div>
      )}
    </>
  );
};
