import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useStore } from './store';
import './index.css';

const SbHeader = () => (
  <header className="header">
    Header
  </header>
)

const App = () => {
  const fetchSportsData = useStore((state) => state.fetchSportsData)

  useEffect(() => {
    fetchSportsData()
  })

  return (
    <article className="container">
      <SbHeader />
    </article>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
