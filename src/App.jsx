import { useEffect } from 'react';
import './App.css';
import Users from './components/Users';
const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  return (
    <>
      <Users />
    </>
  )
}

export default App
