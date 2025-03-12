import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginCard from './components/login/LoginCard';
import HomePage from './components/welcome/Welcome';
import ReferralsPage from './components/referrals/ReferralsPage';
import CreateNF from './components/referrals/CreateNF/CreateNF';
import PatientsPage from './components/patients/PatientsPage';
import StaffingPage from './components/patients/staffing/StaffingPage';
import InfoPaciente from './components/patients/Patients/InfoPaciente/InfoPaciente';
// Importar FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/referrals" element={<ReferralsPage />} />
        <Route path="/createNewReferral" element={<CreateNF />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/paciente/:patientId" element={<InfoPaciente />} />
        <Route path="/staffing" element={<StaffingPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;