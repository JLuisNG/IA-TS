import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/LogoMHC.jpeg';
import '../../../styles/Patients/Staffing/StaffingPage.scss';
import PremiumTabs from '../Patients/PremiunTabs.jsx';

const StaffingPage = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuTransitioning, setMenuTransitioning] = useState(false);
  const [showMenuSwitch, setShowMenuSwitch] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Referencias
  const userMenuRef = useRef(null);
  
  // Efecto para cerrar menú de usuario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
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
    
    // Simular animación de transición y luego navegar
    setTimeout(() => {
      navigate('/homePage');
    }, 300);
  };
  
  // Manejar cambio de pestaña
  const handleTabChange = (tab) => {
    if (tab === 'Patients') {
      setMenuTransitioning(true);
      setTimeout(() => {
        navigate('/patients');
      }, 300);
    }
  };
  
  // Manejar selección de opción
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={`staffing-dashboard ${menuTransitioning ? 'transitioning' : ''}`}>
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
                className="nav-button staffing-menu active" 
                title="Staffing Menu"
              >
                <i className="fas fa-user-md"></i>
                <span>Staffing</span>
                <div className="button-effect"></div>
              </button>
            </div>
          </div>
          
          {/* Sección de pestañas premium */}
          <div className="tabs-section">
            <PremiumTabs activeTab="Staffing" onTabChange={handleTabChange} />
          </div>
          
          {/* Perfil de usuario */}
          <div className="user-profile" ref={userMenuRef}>
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
      <main className="staffing-content">
        <div className="staffing-container">
          {/* Header del dashboard */}
          <div className="staffing-header">
            <div className="staffing-title-container">
              <h1 className="staffing-title">Staffing Management Center</h1>
              <p className="staffing-subtitle">
                Manage your therapy team, track performance and optimize schedules
              </p>
              <div className="header-actions">
                <button className="header-action-btn">
                  <i className="fas fa-info-circle"></i> Quick Tour
                </button>
                <button className="header-action-btn">
                  <i className="fas fa-plus"></i> New Staff Member
                </button>
              </div>
            </div>
            
            <div className="assistant-message">
              <div className="message-content">
                <i className="fas fa-robot"></i>
                <p>Need assistance? Our AI assistant is available 24/7 to help you! <span className="ask-question">Ask a question</span></p>
              </div>
              <div className="message-glow"></div>
            </div>
          </div>

          {/* Opciones de Staffing */}
          <div className="staffing-options">
            <div 
              className={`staffing-option-card ${selectedOption === 'therapists' ? 'selected' : ''}`}
              onClick={() => handleOptionSelect('therapists')}
            >
              <div className="option-icon">
                <i className="fas fa-user-md"></i>
              </div>
              <div className="option-content">
                <h3>Therapists & Office Staff</h3>
                <p>Add or edit therapist and office staff users</p>
                <div className="option-actions">
                  <button className="option-btn">
                    <i className="fas fa-eye"></i> View All
                  </button>
                  <button className="option-btn">
                    <i className="fas fa-plus"></i> Add New
                  </button>
                </div>
              </div>
              <div className="option-glow"></div>
              <div className="option-bg-icon">
                <i className="fas fa-user-md"></i>
              </div>
            </div>
            
            <div 
              className={`staffing-option-card ${selectedOption === 'scheduling' ? 'selected' : ''}`}
              onClick={() => handleOptionSelect('scheduling')}
            >
              <div className="option-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="option-content">
                <h3>Scheduling & Assignments</h3>
                <p>Manage visit schedules and therapist assignments</p>
                <div className="option-actions">
                  <button className="option-btn">
                    <i className="fas fa-calendar-week"></i> View Calendar
                  </button>
                  <button className="option-btn">
                    <i className="fas fa-tasks"></i> Manage Assignments
                  </button>
                </div>
              </div>
              <div className="option-glow"></div>
              <div className="option-bg-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
            </div>
          </div>
          
          {/* Contenedor de estadísticas */}
          <div className="stats-container">
            <h2>Staffing Overview</h2>
            <div className="staffing-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="stat-info">
                  <h3 className="stat-value">14</h3>
                  <p>Total Therapists</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-clipboard-check"></i>
                </div>
                <div className="stat-info">
                  <h3 className="stat-value">243</h3>
                  <p>Monthly Visits</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="stat-info">
                  <h3 className="stat-value">96%</h3>
                  <p>Visit Compliance</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-user-plus"></i>
                </div>
                <div className="stat-info">
                  <h3 className="stat-value">3</h3>
                  <p>Open Positions</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Área de contenido seleccionado - Aquí se mostrará el contenido específico según la opción elegida */}
          <div className="selected-content-area">
            {selectedOption && (
              <div className="selected-content-card">
                <div className="content-header">
                  <h2>
                    {selectedOption === 'therapists' ? 'Therapists & Office Staff' : 'Scheduling & Assignments'}
                  </h2>
                  <p>
                    {selectedOption === 'therapists' 
                      ? 'View and manage your therapy and office staff team members.' 
                      : 'Manage scheduling and patient assignments for your therapy team.'}
                  </p>
                </div>
                
                <div className="content-body">
                  <div className="placeholder-content">
                    <i className={`fas fa-${selectedOption === 'therapists' ? 'users' : 'calendar-alt'}`}></i>
                    <p>Select an action to continue with {selectedOption === 'therapists' ? 'staff management' : 'scheduling'}</p>
                    
                    {selectedOption === 'therapists' && (
                      <div className="action-buttons">
                        <button className="action-btn add">
                          <i className="fas fa-user-plus"></i> Add New Staff
                        </button>
                        <button className="action-btn view">
                          <i className="fas fa-list"></i> View All Staff
                        </button>
                        <button className="action-btn edit">
                          <i className="fas fa-user-edit"></i> Edit Existing Staff
                        </button>
                      </div>
                    )}
                    
                    {selectedOption === 'scheduling' && (
                      <div className="action-buttons">
                        <button className="action-btn calendar">
                          <i className="fas fa-calendar-plus"></i> Create New Schedule
                        </button>
                        <button className="action-btn view">
                          <i className="fas fa-calendar-week"></i> View Calendar
                        </button>
                        <button className="action-btn assign">
                          <i className="fas fa-user-check"></i> Assign Patients
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {!selectedOption && (
              <div className="welcome-select-message">
                <i className="fas fa-hand-point-up"></i>
                <h3>Please Select an Option Above</h3>
                <p>Choose "Therapists & Office Staff" or "Scheduling & Assignments" to get started</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Botón de Acción Rápida Flotante */}
      <div className="quick-action-btn">
        <button className="add-staff-btn">
          <i className="fas fa-plus"></i>
          <span className="btn-tooltip">Add New Staff</span>
        </button>
      </div>
    </div>
  );
};

export default StaffingPage;