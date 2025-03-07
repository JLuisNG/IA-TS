import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/HomePage/HomePage.scss';
import logoImg from '../../assets/LogoMHC.jpeg';
import LogoutAnimation from './LogoutAnimation';

const HomePage = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(1);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const userMenuRef = useRef(null);
  const menuRef = useRef(null);
  
  // Opciones principales del menú
  const menuOptions = ["Patients", "Referrals", "Support", "System Management", "Accounting"];
  
  // Efecto para la rotación automática del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoggingOut) {
        setActiveMenuIndex((prevIndex) => 
          prevIndex >= menuOptions.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [menuOptions.length, isLoggingOut]);
  
  // Cerrar menú de usuario al hacer clic fuera
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
  
  // Manejar el cierre de sesión con animación
  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Después de que la animación se complete, redirigir al login
    setTimeout(() => {
      navigate('/');
    }, 3500); // Tiempo suficiente para mostrar todos los pasos del proceso
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

  return (
    <div className="dashboard">
      {/* Fondo con efecto parallax */}
      <div className="parallax-background">
        <div className="gradient-overlay"></div>
      </div>
      
      {/* Componente de animación de logout */}
      {isLoggingOut && <LogoutAnimation />}
      
      {/* Header con logo y perfil */}
      <header className="main-header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo-container">
            <img src={logoImg} alt="TherapySync Logo" className="logo" />
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
                  onClick={() => setActiveMenuIndex(item.index)}
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
                <div className="menu-item logout" onClick={handleLogout}>
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
 
      </main>
    </div>
  );
};

export default HomePage;