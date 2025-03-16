import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logoImg from '../../../../assets/LogoMHC.jpeg';
import PremiumTabs from '../../PremiunTabs';
import InfoGeneral from './InfoGeneral';
import InfoMedical from './InfoMedical'; 
import DisciplinesSection from './DisciplinesSection';
import ScheduleSection from './ScheduleSection';
import CommentsSection from './CommentsSection';
import '../../../../styles/Patients/InfoPaciente/InfoPaciente.scss';

const InfoPaciente = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuTransitioning, setMenuTransitioning] = useState(false);
  const [showMenuSwitch, setShowMenuSwitch] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('general'); // Para controlar la sección activa

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
        notes: "Patient recovering well. Following exercise regimen as prescribed.",
        // Datos médicos simulados
        medicalData: {
          nursingDiagnosis: "Essential Hypertension, Type 2 Diabetes Mellitus",
          pmh: "Hypertension (5 years), Type 2 Diabetes (3 years), Dyslipidemia",
          clinicalGrouping: "Clinical Group 1 - MMTA - Cardiac",
          wbs: "Weakness, Balance deficit, Safety concerns at home",
          homebound: "Patient is homebound due to mobility limitations and risk of falls",
          height: "5'6\"",
          weight: "165 lbs",
          bmi: "26.6"
        },
        // Datos de disciplinas simulados
        disciplinesData: {
          physical: {
            isPrimary: true,
            primaryTherapist: {
              id: 1,
              name: "Araquel, Regina",
              role: "PT",
              phone: "(917) 617-6012",
              email: "raraquel@therapy.com",
              isActive: true 
            },
            assistantTherapist: {
              id: 2,
              name: "Staffey, Jacob",
              role: "PTA",
              phone: "(310) 902-0768",
              email: "jstaffey@therapy.com",
              isActive: true
            },
            frequency: "2W2 1W1",
            lastUpdated: "03/10/2025",
            sessionsCompleted: 12,
            goals: [
              { id: 1, text: "Patient will improve balance while standing to reduce fall risk.", progress: 65, target: "By 04/15/2025" },
              { id: 2, text: "Patient will increase strength in lower extremities to improve mobility.", progress: 40, target: "By 04/30/2025" }
            ]
          },
          occupational: {
            isPrimary: false,
            primaryTherapist: {
              id: 3,
              name: "Shimane, Justin",
              role: "OT",
              phone: "(310) 529-8395",
              email: "jshimane@therapy.com",
              isActive: true
            },
            assistantTherapist: {
              id: 4,
              name: "Kim, April",
              role: "COTA",
              phone: "(562) 242-8175",
              email: "akim@therapy.com",
              isActive: true
            },
            frequency: "NO FREQUENCY SET",
            lastUpdated: "03/05/2025",
            sessionsCompleted: 8,
            goals: [
              { id: 5, text: "Patient will independently perform dressing activities with minimal assistance.", progress: 55, target: "By 04/20/2025" },
              { id: 6, text: "Patient will demonstrate proper body mechanics during ADLs to reduce fall risk.", progress: 70, target: "By 03/30/2025" }
            ]
          },
          speech: {
            isPrimary: false,
            primaryTherapist: {
              id: 5,
              name: "Martinez, Elena",
              role: "ST",
              phone: "(213) 456-7890",
              email: "emartinez@therapy.com",
              isActive: true
            },
            assistantTherapist: {
              id: 6,
              name: "Johnson, Mark",
              role: "STA",
              phone: "(310) 765-4321",
              email: "mjohnson@therapy.com",
              isActive: false
            },
            frequency: "1W2",
            lastUpdated: "03/08/2025",
            sessionsCompleted: 5,
            goals: [
              { id: 8, text: "Patient will improve swallowing function to safely consume regular consistency foods.", progress: 60, target: "By 04/10/2025" },
              { id: 9, text: "Patient will increase speech clarity to be understood by unfamiliar listeners.", progress: 50, target: "By 04/05/2025" }
            ]
          }
        }
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

  // Función para cambiar entre secciones
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Función para actualizar datos médicos
  const handleMedicalUpdate = (updatedMedicalData) => {
    setPatientData(prevData => ({
      ...prevData,
      medicalData: {
        ...prevData.medicalData,
        ...updatedMedicalData
      }
    }));
  };

  // Función para actualizar datos de disciplinas
  const handleDisciplinesUpdate = (updatedDisciplinesData) => {
    setPatientData(prevData => ({
      ...prevData,
      disciplinesData: {
        ...prevData.disciplinesData,
        ...updatedDisciplinesData
      }
    }));
  };

  // Renderizar la sección activa
  const renderActiveSection = () => {
    if (loading) return null;

    switch (activeSection) {
      case 'general':
        return <InfoGeneral patientData={patientData} />;
      case 'medical':
        return (
          <InfoMedical 
            patientData={patientData}
            onMedicalUpdate={handleMedicalUpdate}
          />
        );
      case 'disciplines':
        return (
          <DisciplinesSection 
            patientId={patientData.id} 
            disciplinesData={patientData.disciplinesData}
            onDisciplinesUpdate={handleDisciplinesUpdate}
          />
        ); 
      case 'schedule':
        return <ScheduleSection patientId={patientData.id} />;
      case 'comments':
        return <CommentsSection patientId={patientData.id} />;
      default:
        return <InfoGeneral patientData={patientData} />;
    }
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
              </div>

              {/* Pestañas de navegación para secciones del paciente */}
              <div className="section-tabs">
                <button 
                  className={`section-tab ${activeSection === 'general' ? 'active' : ''}`}
                  onClick={() => handleSectionChange('general')}
                >
                  <i className="fas fa-user"></i> General
                </button>
                <button 
                  className={`section-tab ${activeSection === 'medical' ? 'active' : ''}`}
                  onClick={() => handleSectionChange('medical')}
                >
                  <i className="fas fa-notes-medical"></i> Medical
                </button>
                <button 
                  className={`section-tab ${activeSection === 'disciplines' ? 'active' : ''}`}
                  onClick={() => handleSectionChange('disciplines')}
                >
                  <i className="fas fa-user-md"></i> Disciplines
                </button>
                <button 
                  className={`section-tab ${activeSection === 'schedule' ? 'active' : ''}`}
                  onClick={() => handleSectionChange('schedule')}
                >
                  <i className="fas fa-calendar-alt"></i> Schedule
                </button>
                <button 
                  className={`section-tab ${activeSection === 'comments' ? 'active' : ''}`}
                  onClick={() => handleSectionChange('comments')}
                >
                  <i className="fas fa-comments"></i> Comments
                </button>
              </div>

              {/* Contenido dinámico basado en la sección activa */}
              <div className="section-content">
                {renderActiveSection()}
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