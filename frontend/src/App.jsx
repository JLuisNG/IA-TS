import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginCard from './components/login/LoginCard';
import HomePage from './components/homePage/homePage';
// Importar FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginCard />} />
        <Route path="/homePage" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;