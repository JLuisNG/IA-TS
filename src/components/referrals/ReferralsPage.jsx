import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Referrals/ReferralsPage.scss';
import logoImg from '../../assets/LogoMHC.jpeg';

const ReferralsPage = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(1); // Por defecto en "Create New Referral"
  const [menuTransitioning, setMenuTransitioning] = useState(false);
  const [showMenuSwitch, setShowMenuSwitch] = useState(false);
  const userMenuRef = useRef(null);
  const menuRef = useRef(null);
  
  // Opciones del menú de referrals
  const menuOptions = [
    "Admin Referral Inbox",
    "Create New Referral",
    "Resend Referral",
    "View Referral History",
    "Referral Stats"
  ];
  
  // Efecto para la rotación automática del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!menuTransitioning) {
        setActiveMenuIndex((prevIndex) => 
          prevIndex >= menuOptions.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [menuOptions.length, menuTransitioning]);
  
  // Efecto para mostrar el indicador de cambio de menú cuando el mouse está cerca del borde
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Mostrar el indicador cuando el mouse está a menos de 50px del borde izquierdo
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
  
  // Manejar transición al menú principal
  const handleMainMenuTransition = () => {
    setMenuTransitioning(true);
    
    // Simular la transición y luego navegar
    setTimeout(() => {
      navigate('/homePage');
    }, 300);
  };
  
  // Manejar la navegación a izquierda en el carrusel
  const handlePrevious = () => {
    setActiveMenuIndex((prevIndex) => 
      prevIndex <= 0 ? menuOptions.length - 1 : prevIndex - 1
    );
  };
  
  // Manejar la navegación a derecha en el carrusel
  const handleNext = () => {
    setActiveMenuIndex((prevIndex) => 
      prevIndex >= menuOptions.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Manejar clic en una opción del menú
  const handleMenuOptionClick = (index) => {
    setActiveMenuIndex(index);
    
    // Si se selecciona "Create New Referral", navegar a la página correspondiente
    if (menuOptions[index] === "Create New Referral") {
      setMenuTransitioning(true);
      
      // Simular la transición y luego navegar
      setTimeout(() => {
        navigate('/createNewReferral');
      }, 300);
      return; // Para evitar actualizar el índice si vamos a navegar a otra página
    }
  };
  
  // Obtener las opciones visibles del menú para el carrusel (3 elementos)
  const getVisibleMenuOptions = () => {
    const result = [];
    const totalOptions = menuOptions.length;
    
    // Calcular los índices para los 3 elementos visibles (anterior, actual, siguiente)
    const prevIndex = activeMenuIndex === 0 ? totalOptions - 1 : activeMenuIndex - 1;
    const nextIndex = activeMenuIndex === totalOptions - 1 ? 0 : activeMenuIndex + 1;
    
    result.push({index: prevIndex, text: menuOptions[prevIndex], position: 'left'});
    result.push({index: activeMenuIndex, text: menuOptions[activeMenuIndex], position: 'center'});
    result.push({index: nextIndex, text: menuOptions[nextIndex], position: 'right'});
    
    return result;
  };

  // Obtener el ícono correspondiente a la opción seleccionada
  const getOptionIcon = (index) => {
    switch(index) {
      case 0: return 'inbox';
      case 1: return 'plus-circle';
      case 2: return 'paper-plane';
      case 3: return 'history';
      case 4: return 'chart-bar';
      default: return 'file-medical';
    }
  };

  return (
    <div className={`referrals-dashboard ${menuTransitioning ? 'transitioning' : ''}`}>
      {/* Fondo con efecto parallax */}
      <div className="parallax-background">
        <div className="gradient-overlay"></div>
      </div>
      
      {/* Indicador flotante para cambiar al menú principal */}
      {showMenuSwitch && (
        <div 
          className="menu-switch-indicator"
          onClick={handleMainMenuTransition}
          title="Volver al menú principal"
        ></div>
      )}
      
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
                title="Menú de Referrals"
              >
                <i className="fas fa-file-medical"></i>
                <span>Referrals</span>
              </button>
            </div>
          </div>
          
          {/* Carrusel en la parte superior */}
          <div className="top-carousel" ref={menuRef}>
            <button className="carousel-arrow left" onClick={handlePrevious} aria-label="Previous">
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="carousel-options">
              {getVisibleMenuOptions().map((item) => (
                <div 
                  key={item.index} 
                  className={`carousel-option ${item.position}`}
                  onClick={() => handleMenuOptionClick(item.index)}
                >
                  <span>{item.text}</span>
                  {item.position === 'center' && (
                    <div className="active-underline"></div>
                  )}
                </div>
              ))}
            </div>
            
            <button className="carousel-arrow right" onClick={handleNext} aria-label="Next">
              <i className="fas fa-chevron-right"></i>
            </button>
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
        <div className="referrals-container">
          <h1 className="referrals-title">Referral Management</h1>
          <p className="referrals-subtitle">Select an option from the menu above to manage referrals</p>
          
          {/* Contenido dinámico según la opción seleccionada */}
          <div className="referrals-content">
            <div className="content-placeholder">
              <i className={`fas fa-${getOptionIcon(activeMenuIndex)}`}></i>
              <h2>{menuOptions[activeMenuIndex]}</h2>
              <p>El contenido para esta sección se cargará aquí.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReferralsPage;