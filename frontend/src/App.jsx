import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginCard from './pages/login/LoginCard';
import HomePage from './pages/welcome/Welcome';
// Importar FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/welcome" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;