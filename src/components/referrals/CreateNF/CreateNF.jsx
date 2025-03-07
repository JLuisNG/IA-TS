import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Referrals/CreateNF/CreateNF.scss';
import logoImg from '../../../assets/LogoMHC.jpeg';

const CreateNF = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  
  // Efecto para cerrar menú de usuario al hacer clic fuera
  React.useEffect(() => {
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
  
  // Manejar transición al menú principal
  const handleMainMenuTransition = () => {
    navigate('/homePage');
  };
  
  // Manejar transición al menú de referrals
  const handleReferralsMenuTransition = () => {
    navigate('/referrals');
  };
  
  // Manejador para volver a la lista de referrals
  const handleBackToReferrals = () => {
    navigate('/referrals');
  };

  return (
    <div className="create-referral-dashboard">
      {/* Fondo con efecto parallax */}
      <div className="parallax-background">
        <div className="gradient-overlay"></div>
      </div>
      
      {/* Header con logo y perfil */}
      <header className="main-header">
        <div className="header-container">
          {/* Logo y navegación de menús */}
          <div className="logo-container">
            <img src={logoImg} alt="TherapySync Logo" className="logo" />
            
            {/* Navegación entre menús */}
            <div className="menu-navigation">
              <button 
                className="nav-button main-menu" 
                onClick={handleMainMenuTransition}
                title="Volver al menú principal"
              >
                <i className="fas fa-th-large"></i>
                <span>Menú Principal</span>
              </button>
              
              <button 
                className="nav-button referrals-menu active" 
                onClick={handleReferralsMenuTransition}
                title="Menú de Referrals"
              >
                <i className="fas fa-file-medical"></i>
                <span>Referrals</span>
              </button>
            </div>
          </div>
          
          {/* Título de la sección actual */}
          <div className="current-section">
            <h2>Create New Referral</h2>
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
              </div>
              
              <i className={`fas fa-chevron-${showUserMenu ? 'up' : 'down'}`}></i>
            </div>
            
            {/* Menú desplegable del usuario */}
            {showUserMenu && (
              <div className="user-menu">
                <div className="menu-item">
                  <i className="fas fa-user-circle"></i>
                  <span>My Account</span>
                </div>
                <div className="menu-divider"></div>
                <div className="menu-item logout" onClick={handleMainMenuTransition}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Log Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Contenido principal */}
      <main className="main-content">
        <div className="create-referral-container">
          {/* Navegación de miga de pan */}
          <div className="breadcrumb-navigation">
            <button className="back-button" onClick={handleBackToReferrals}>
              <i className="fas fa-arrow-left"></i>
              <span>Back to Referrals</span>
            </button>
            <div className="breadcrumb-path">
              <span>Referrals</span>
              <i className="fas fa-chevron-right"></i>
              <span className="current">Create New Referral</span>
            </div>
          </div>
          
          {/* Contenedor para el futuro formulario */}
          <div className="form-container">
            <div className="form-header">
              <h2>
                <i className="fas fa-plus-circle"></i>
                New Referral Information
              </h2>
              <p>Complete the form below to create a new patient referral</p>
            </div>
            
            {/* Placeholder para el futuro formulario */}
            <div className="form-placeholder">
              <div className="placeholder-icon">
                <i className="fas fa-plus-circle"></i>
              </div>
              <h3>New Referral Form</h3>
              <p>Esta área contendrá el formulario para crear nuevas referencias médicas</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateNF;