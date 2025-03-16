import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginCard from './components/login/LoginCard';
import HomePage from './components/welcome/Welcome';
import SupportPage from './components/support/SupportPage';
import ReferralsPage from './components/referrals/ReferralsPage';
import CreateNF from './components/referrals/CreateNF/CreateNF';
import PatientsPage from './components/patients/PatientsPage';
import StaffingPage from './components/patients/staffing/StaffingPage';
import InfoPaciente from './components/patients/Patients/InfoPaciente/InfoPaciente';
import Accounting from './components/accounting/Accounting';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/referrals" element={<ReferralsPage />} />
        <Route path="/createNewReferral" element={<CreateNF />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/paciente/:patientId" element={<InfoPaciente />} />
        <Route path="/staffing" element={<StaffingPage />} />
        <Route path="/accounting" element={<Accounting />} />
      </Routes>
    </HashRouter>
  );
}

export default App;