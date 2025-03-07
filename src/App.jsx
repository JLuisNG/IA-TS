import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginCard from './components/login/LoginCard';
import HomePage from './components/welcome/Welcome';
import ReferralsPage from './components/referrals/ReferralsPage'; // Importar la nueva página
// Importar FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/referrals" element={<ReferralsPage />} /> {/* Nueva ruta */}
      </Routes>
    </HashRouter>
  );
}

export default App;