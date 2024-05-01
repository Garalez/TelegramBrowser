import { useEffect } from 'react';
import './App.css';
import Users from './Users';
const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <>
      <Users />
    </>
  )
}

export default App
