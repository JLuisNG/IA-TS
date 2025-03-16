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
  const containerRef = useRef(null);
  const [parallaxPosition, setParallaxPosition] = useState({ x: 0, y: 0 });
  
  // Opciones del menú de referrals con iconos y colores personalizados
  const menuOptions = [
    { id: 1, name: "Admin Referral Inbox", icon: "fa-inbox", route: '/referrals/inbox', color: "#4facfe" },
    { id: 2, name: "Create New Referral", icon: "fa-file-medical", route: '/referrals/new', color: "#ff9966" },
    { id: 3, name: "Resend Referral", icon: "fa-paper-plane", route: '/referrals/resend', color: "#00e5ff" },
    { id: 4, name: "View Referral History", icon: "fa-history", route: '/referrals/history', color: "#8c54ff" },
    { id: 5, name: "Referral Stats", icon: "fa-chart-bar", route: '/referrals/stats', color: "#4CAF50" }
  ];
  
  // Efecto para la rotación automática del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!menuTransitioning) {
        setActiveMenuIndex((prevIndex) => 
          prevIndex >= menuOptions.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 10000); // Cada 10 segundos
    
    return () => clearInterval(interval);
  }, [menuOptions.length, menuTransitioning]);
  
  // Efecto para mostrar el indicador de cambio de menú
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Mostrar el indicador cuando el mouse está a menos de 50px del borde izquierdo
      if (e.clientX < 50) {
        setShowMenuSwitch(true);
      } else if (e.clientX > 100) {
        setShowMenuSwitch(false);
      }

      // Efecto parallax para el fondo
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const xPos = (e.clientX / width - 0.5) * 10;
        const yPos = (e.clientY / height - 0.5) * 5;
        setParallaxPosition({ x: xPos, y: yPos });
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
  const handleMenuOptionClick = (optionIndex) => {
    setActiveMenuIndex(optionIndex);
    
    // Si se selecciona "Create New Referral", navegar a la página correspondiente
    if (menuOptions[optionIndex].name === "Create New Referral") {
      setMenuTransitioning(true);
      
      // Simular la transición y luego navegar
      setTimeout(() => {
        navigate('/createNewReferral');
      }, 300);
      return; // Para evitar actualizar el índice si vamos a navegar a otra página
    }
  };
  
  // Obtener las opciones visibles del menú para el carrusel (5 elementos con diferentes tamaños)
  const getVisibleMenuOptions = () => {
    const result = [];
    const totalOptions = menuOptions.length;
    
    // Obtener los índices para 5 elementos visibles con el activo en el centro
    for (let i = -2; i <= 2; i++) {
      const actualIndex = (activeMenuIndex + i + totalOptions) % totalOptions;
      
      // Determinar la posición basada en la distancia al elemento activo
      let position;
      if (i === -2) position = 'far-left';
      else if (i === -1) position = 'left';
      else if (i === 0) position = 'center';
      else if (i === 1) position = 'right';
      else position = 'far-right';
      
      // Añadir z-index adicional para controlar superposición
      const zIndex = i === 0 ? 3 : (Math.abs(i) === 1 ? 2 : 1);
      
      result.push({
        ...menuOptions[actualIndex],
        position,
        zIndex
      });
    }
    
    return result;
  };

  return (
    <div 
      className={`referrals-dashboard ${menuTransitioning ? 'transitioning' : ''}`}
      ref={containerRef}
    >
      {/* Fondo con efecto parallax */}
      <div 
        className="parallax-background"
        style={{ 
          transform: `scale(1.1) translate(${parallaxPosition.x}px, ${parallaxPosition.y}px)` 
        }}
      >
        <div className="gradient-overlay"></div>
      </div>
      
      {/* Indicador flotante mejorado para cambiar al menú principal */}
      {showMenuSwitch && (
        <div 
          className="menu-switch-indicator"
          onClick={handleMainMenuTransition}
          title="Volver al menú principal"
        >
          <i className="fas fa-th-large"></i>
          <span>Menú Principal</span>
        </div>
      )}
      
      {/* Header con logo y perfil */}
      <header className="main-header">
        <div className="header-container">
          {/* Logo con efecto neón */}
          <div className="logo-container">
            <div className="logo-glow"></div>
            <img src={logoImg} alt="TherapySync Logo" className="logo" />
          </div>
          
          {/* Botones de navegación principales */}
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
          
          {/* Carrusel en la parte superior - versión 3D */}
          <div className="top-carousel" ref={menuRef}>
            <button className="carousel-arrow left" onClick={handlePrevious} aria-label="Previous">
              <div className="arrow-icon">
                <i className="fas fa-chevron-left"></i>
              </div>
            </button>
            
            <div className="carousel-options">
              {getVisibleMenuOptions().map((item) => (
                <div 
                  key={item.id} 
                  className={`carousel-option ${item.position}`}
                  onClick={() => handleMenuOptionClick(menuOptions.findIndex(option => option.id === item.id))}
                  style={{ zIndex: item.zIndex }}
                >
                  <div className="option-content">
                    <div 
                      className="option-icon"
                      style={{ 
                        background: `linear-gradient(135deg, ${item.color}CC, ${item.color}80)`,
                      }}
                    >
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <span style={item.position === 'center' ? { color: item.color } : {}}>{item.name}</span>
                    {item.position === 'center' && (
                      <div className="active-underline" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` }}></div>
                    )}
                  </div>
                  {item.position === 'center' && (
                    <div className="option-glow" style={{ boxShadow: `0 0 30px ${item.color}80` }}></div>
                  )}
                </div>
              ))}
            </div>
            
            <button className="carousel-arrow right" onClick={handleNext} aria-label="Next">
              <div className="arrow-icon">
                <i className="fas fa-chevron-right"></i>
              </div>
            </button>
          </div>
          
          {/* Perfil de usuario mejorado */}
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
            
            {/* Menú desplegable del usuario */}
            {showUserMenu && (
              <div className="user-menu">
                <div className="menu-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      <span>LN</span>
                    </div>
                    <div className="user-details">
                      <h4>Luis Nava</h4>
                      <span className="user-email">luis.nava@example.com</span>
                    </div>
                  </div>
                </div>
                <div className="menu-items">
                  <div className="menu-item">
                    <i className="fas fa-user-circle"></i>
                    <span>My Account</span>
                  </div>
                  <div className="menu-item">
                    <i className="fas fa-cog"></i>
                    <span>Settings</span>
                  </div>
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
              <i className={`fas ${menuOptions[activeMenuIndex].icon}`} style={{ color: menuOptions[activeMenuIndex].color }}></i>
              <h2>{menuOptions[activeMenuIndex].name}</h2>
              <p>El contenido para esta sección se cargará aquí.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReferralsPage;