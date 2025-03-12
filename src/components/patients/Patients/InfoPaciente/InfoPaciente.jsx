import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logoImg from '../../../../assets/LogoMHC.jpeg';
import PremiumTabs from '../../PremiunTabs';
import '../../../../styles/Patients/InfoPaciente/InfoPaciente.scss';

const InfoPaciente = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuTransitioning, setMenuTransitioning] = useState(false);
  const [showMenuSwitch, setShowMenuSwitch] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simular carga de datos del paciente
  useEffect(() => {
    // Simulación de consulta a API para obtener datos del paciente
    const fetchPatientData = () => {
      // Aquí se implementaría una llamada a API real
      // Por ahora usamos datos simulados
      const mockPatientData = {
        id: patientId || '1',
        name: "Adhami, Soheila",
        therapist: "John Smith",
        therapistType: "PT",
        agency: "Supportive Health Group",
        street: "1800 Camden Avenue",
        city: "Los Angeles",
        state: "CA",
        zip: "90025",
        phone: "(310) 808-5631",
        certPeriod: "04-19-2023 to 04-19-2025",
        status: "Active",
        email: "sadhami@example.com",
        dob: "05/12/1965",
        insurance: "Blue Cross Blue Shield",
        policyNumber: "BCB-123456789",
        emergencyContact: "Mohammed Adhami",
        emergencyPhone: "(310) 555-7890",
        notes: "Patient recovering well. Following exercise regimen as prescribed."
      };

      setTimeout(() => {
        setPatientData(mockPatientData);
        setLoading(false);
      }, 800);
    };

    fetchPatientData();
  }, [patientId]);

  // Efecto para mostrar el indicador de cambio de menú cuando el mouse está cerca del borde izquierdo
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX < 50) {
        setShowMenuSwitch(true);
      } else if (e.clientX > 100) {
        setShowMenuSwitch(false);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Manejar navegación al menú principal
  const handleMainMenuTransition = () => {
    setMenuTransitioning(true);
    
    setTimeout(() => {
      navigate('/homePage');
    }, 300);
  };

  // Manejar cambio de pestaña
  const handleTabChange = (tab) => {
    if (tab === 'Staffing') {
      setMenuTransitioning(true);
      
      setTimeout(() => {
        navigate('/staffing');
      }, 300);
    } else if (tab === 'Patients') {
      setMenuTransitioning(true);
      
      setTimeout(() => {
        navigate('/patients');
      }, 300);
    }
  };

  // Manejar navegación a la página de pacientes
  const handlePatientsClick = () => {
    setMenuTransitioning(true);
    
    setTimeout(() => {
      navigate('/patients');
    }, 300);
  };

  return (
    <div className={`info-paciente ${menuTransitioning ? 'transitioning' : ''}`}>
      {/* Fondo parallax */}
      <div className="parallax-background">
        <div className="gradient-overlay"></div>
        <div className="animated-particles"></div>
      </div>
      
      {/* Indicador flotante para cambiar al menú principal */}
      {showMenuSwitch && (
        <div 
          className="menu-switch-indicator"
          onClick={handleMainMenuTransition}
          title="Back to main menu"
        >
          <i className="fas fa-chevron-left"></i>
        </div>
      )}
      
      {/* Header con logo y perfil */}
      <header className="main-header">
        <div className="header-container">
          {/* Logo y navegación */}
          <div className="logo-container">
            <div className="logo-wrapper">
              <img src={logoImg} alt="TherapySync Logo" className="logo" />
              <div className="logo-glow"></div>
            </div>
            
            {/* Navegación de menú */}
            <div className="menu-navigation">
              <button 
                className="nav-button main-menu" 
                onClick={handleMainMenuTransition}
                title="Back to main menu"
              >
                <i className="fas fa-th-large"></i>
                <span>Main Menu</span>
                <div className="button-effect"></div>
              </button>
              
              <button 
                className="nav-button patients-menu" 
                onClick={handlePatientsClick}
                title="Patients Menu"
              >
                <i className="fas fa-user-injured"></i>
                <span>Patients</span>
                <div className="button-effect"></div>
              </button>

              <button 
                className="nav-button info-menu active" 
                title="Patient Information"
              >
                <i className="fas fa-info-circle"></i>
                <span>Information</span>
                <div className="button-effect"></div>
              </button>
            </div>
          </div>
          
          {/* Sección de pestañas premium */}
          <div className="tabs-section">
            <PremiumTabs activeTab="Patients" onTabChange={handleTabChange} />
          </div>
          
          {/* Perfil de usuario */}
          <div className="user-profile">
            <div 
              className={`profile-button ${showUserMenu ? 'active' : ''}`} 
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="profile-info">
                <span className="user-name">Luis Nava</span>
                <span className="user-role">Admin</span>
              </div>
              
              <div className="avatar">
                <div className="avatar-text">LN</div>
                <div className="avatar-ring"></div>
              </div>
              
              <i className={`fas fa-chevron-${showUserMenu ? 'up' : 'down'}`}></i>
            </div>
            
            {/* Menú desplegable de usuario */}
            {showUserMenu && (
              <div className="user-menu">
                <div className="menu-item">
                  <i className="fas fa-user-circle"></i>
                  <span>My Account</span>
                </div>
                <div className="menu-item">
                  <i className="fas fa-cog"></i>
                  <span>Settings</span>
                </div>
                <div className="menu-item">
                  <i className="fas fa-bell"></i>
                  <span>Notifications</span>
                  <span className="badge">3</span>
                </div>
                <div className="menu-divider"></div>
                <div className="menu-item">
                  <i className="fas fa-question-circle"></i>
                  <span>Help & Support</span>
                </div>
                <div className="menu-item logout">
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Log Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Contenido principal */}
      <main className="info-paciente-content">
        <div className="info-container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando información del paciente...</p>
            </div>
          ) : (
            <>
              {/* Breadcrumb de navegación */}
              <div className="breadcrumb">
                <span onClick={handlePatientsClick} className="breadcrumb-item">Patients</span>
                <i className="fas fa-chevron-right"></i>
                <span className="breadcrumb-item current">{patientData.name}</span>
              </div>

              {/* Header de información del paciente */}
              <div className="patient-header">
                <div className="patient-title-container">
                  <h1 className="patient-title">
                    <span className="patient-name">{patientData.name}</span>
                    <span className={`status-badge ${patientData.status.toLowerCase()}`}>
                      {patientData.status}
                    </span>
                  </h1>
                  <p className="patient-subtitle">
                    Patient ID: #{patientData.id} | <i className="fas fa-phone"></i> {patientData.phone}
                  </p>
                </div>
                
                <div className="patient-actions">
                  <button className="action-button edit">
                    <i className="fas fa-edit"></i> Edit Patient
                  </button>
                  <button className="action-button notes">
                    <i className="fas fa-clipboard"></i> Clinical Notes
                  </button>
                  <button className="action-button schedule">
                    <i className="fas fa-calendar-alt"></i> Schedule
                  </button>
                </div>
              </div>

              {/* Contenido de información del paciente */}
              <div className="patient-content">
                {/* Tarjeta de información personal */}
                <div className="info-card personal-info">
                  <div className="card-header">
                    <h3><i className="fas fa-user"></i> Personal Information</h3>
                  </div>
                  <div className="card-content">
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Full Name</label>
                        <p>{patientData.name}</p>
                      </div>
                      <div className="info-item">
                        <label>Date of Birth</label>
                        <p>{patientData.dob}</p>
                      </div>
                      <div className="info-item">
                        <label>Phone</label>
                        <p>{patientData.phone}</p>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <p>{patientData.email}</p>
                      </div>
                      <div className="info-item">
                        <label>Address</label>
                        <p>{patientData.street}, {patientData.city}, {patientData.state} {patientData.zip}</p>
                      </div>
                      <div className="info-item">
                        <label>Emergency Contact</label>
                        <p>{patientData.emergencyContact} | {patientData.emergencyPhone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tarjeta de información de terapia */}
                <div className="info-card therapy-info">
                  <div className="card-header">
                    <h3><i className="fas fa-user-md"></i> Therapy Information</h3>
                  </div>
                  <div className="card-content">
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Therapist</label>
                        <p>
                          <span className="therapist-badge">{patientData.therapistType}</span>
                          {patientData.therapist}
                        </p>
                      </div>
                      <div className="info-item">
                        <label>Agency</label>
                        <p>{patientData.agency}</p>
                      </div>
                      <div className="info-item">
                        <label>Certification Period</label>
                        <p>{patientData.certPeriod}</p>
                      </div>
                      <div className="info-item">
                        <label>Insurance</label>
                        <p>{patientData.insurance}</p>
                      </div>
                      <div className="info-item">
                        <label>Policy Number</label>
                        <p>{patientData.policyNumber}</p>
                      </div>
                      <div className="info-item">
                        <label>Status</label>
                        <p>
                          <span className={`status-badge ${patientData.status.toLowerCase()}`}>
                            {patientData.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tarjeta de notas clínicas */}
                <div className="info-card clinical-notes">
                  <div className="card-header">
                    <h3><i className="fas fa-clipboard"></i> Clinical Notes</h3>
                    <button className="add-note-btn">
                      <i className="fas fa-plus"></i> Add Note
                    </button>
                  </div>
                  <div className="card-content">
                    <div className="note-entry">
                      <div className="note-header">
                        <span className="date">March 12, 2025</span>
                        <span className="author">Dr. John Smith</span>
                      </div>
                      <p className="note-text">{patientData.notes}</p>
                    </div>
                    <div className="note-entry">
                      <div className="note-header">
                        <span className="date">February 28, 2025</span>
                        <span className="author">Dr. John Smith</span>
                      </div>
                      <p className="note-text">Initial assessment completed. Patient showing good range of motion. Prescribed exercise program for home therapy.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      {/* Botón de regresar flotante */}
      <div className="quick-action-btn">
        <button className="back-button" onClick={handlePatientsClick}>
          <i className="fas fa-arrow-left"></i>
          <span className="btn-tooltip">Back to Patients</span>
        </button>
      </div>
    </div>
  );
};

export default InfoPaciente;