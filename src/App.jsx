import { useEffect } from 'react';
import './App.css';
import Users from './Users';
const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  }
  return (
    <>
      <Users />
      <button onClick={onClose}>Close</button>
    </>
  )
}

export default App
