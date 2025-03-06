import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginCard from './components/Login/LoginCard';
// Importar FontAwesome

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginCard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;