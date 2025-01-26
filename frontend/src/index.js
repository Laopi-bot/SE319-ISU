import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import GameHub from './GameHub';
import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameHub />
  </React.StrictMode>
);