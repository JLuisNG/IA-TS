import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Welcome/Welcome.scss';
import logoImg from '../../assets/LogoMHC.jpeg';
import LogoutAnimation from './LogoutAnimation';
import InfoWelcome from './infoWelcome';
import AIAssistant from './AIAssistant';

const HomePage = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(4); // Establecer Accounting como activo de forma predeterminada
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [menuTransitioning, setMenuTransitioning] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [parallaxPosition, setParallaxPosition] = useState({ x: 0, y: 0 });
  const [headerGlow, setHeaderGlow] = useState(false);
  const [particles, setParticles] = useState([]);
  const [welcomeAnimComplete, setWelcomeAnimComplete] = useState(false);
  
  const userMenuRef = useRef(null);
  const menuRef = useRef(null);
  const containerRef = useRef(null);
  
  // Opciones principales del menú mejoradas con iconos
  const menuOptions = [
    { id: 1, name: "Patients", icon: "fa-user-injured", route: '/patients', color: "#36D1DC" },
    { id: 2, name: "Referrals", icon: "fa-file-medical", route: '/referrals', color: "#FF9966" },
    { id: 3, name: "Support", icon: "fa-headset", route: '/support', color: "#64B5F6" },
    { id: 4, name: "System Management", icon: "fa-cogs", route: '/management', color: "#8B5CF6" },
    { id: 5, name: "Accounting", icon: "fa-chart-pie", route: '/accounting', color: "#4CAF50" }
  ];
  
  // Generar partículas aleatorias para el efecto de fondo
  const generateParticles = () => {
    const particlesArray = [];
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 3,
        speed: Math.random() * 0.8 + 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
        delay: Math.random() * 5
      });
    }
    
    setParticles(particlesArray);
  };
  
  // Efecto para cargar el asistente después de que la página esté completamente cargada
  useEffect(() => {
    // Generar partículas
    generateParticles();
    
    // Animación de entrada completa
    setTimeout(() => {
      setWelcomeAnimComplete(true);
    }, 1500);
    
    // Retraso para asegurar que la página se cargue primero
    const timer = setTimeout(() => {
      setShowAIAssistant(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Efecto para la rotación automática del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoggingOut && !menuTransitioning) {
        setActiveMenuIndex((prevIndex) => 
          prevIndex >= menuOptions.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [menuOptions.length, isLoggingOut, menuTransitioning]);
  
  // Efecto para activar el efecto de parallax en el fondo
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { clientX, clientY } = e;
        const { width, height } = containerRef.current.getBoundingClientRect();
        
        // Calcular posición relativa al centro
        const xPos = (clientX / width - 0.5) * 20; // Limitado a +-10px
        const yPos = (clientY / height - 0.5) * 15; // Limitado a +-7.5px
        
        setParallaxPosition({ x: xPos, y: yPos });
        
        // Activar el brillo del header cuando el mouse está en la parte superior
        if (clientY < 100) {
          setHeaderGlow(true);
        } else {
          setHeaderGlow(false);
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
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
  
  // Manejar el cierre de sesión con animación mejorada
  const handleLogout = () => {
    setIsLoggingOut(true);
    setShowUserMenu(false);
    setShowAIAssistant(false);
    
    // Después de que la animación se complete, redirigir al login
    setTimeout(() => {
      navigate('/');
    }, 5000); // Tiempo ajustado para la animación mejorada
  };
  
  // Manejar clic en opción del menú principal
  const handleMenuOptionClick = (option) => {
    setActiveMenuIndex(menuOptions.findIndex(o => o.id === option.id));
    setMenuTransitioning(true);
    setShowAIAssistant(false);
    
    // Navegar a la página correspondiente según la opción del menú
    setTimeout(() => {
      navigate(option.route);
    }, 500);
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
      
      result.push({
        ...menuOptions[actualIndex],
        position
      });
    }
    
    return result;
  };

  return (
    <div 
      className={`dashboard ${menuTransitioning ? 'transitioning' : ''} ${welcomeAnimComplete ? 'anim-complete' : ''}`}
      ref={containerRef}
    >
      {/* Fondo con efecto parallax avanzado */}
      <div 
        className="parallax-background"
        style={{ 
          transform: `scale(1.1) translate(${parallaxPosition.x}px, ${parallaxPosition.y}px)` 
        }}
      >
        <div className="gradient-overlay"></div>
        
        {/* Partículas flotantes */}
        <div className="particles-container">
          {particles.map(particle => (
            <div 
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                backgroundColor: particle.color,
                animationDuration: `${10 + particle.speed * 20}s`,
                animationDelay: `${particle.delay}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Componente de animación de logout */}
      {isLoggingOut && <LogoutAnimation />}
      
      {/* Header con logo y perfil con efectos premium */}
      <header className={`main-header ${headerGlow ? 'glow-effect' : ''}`}>
        <div className="header-container">
          {/* Logo con efectos */}
          <div className="logo-container">
            <div className="logo-glow"></div>
            <img src={logoImg} alt="TherapySync Logo" className="logo" />
          </div>
          
          {/* Carrusel superior mejorado */}
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
                  onClick={() => handleMenuOptionClick(item)}
                >
                  <div className="option-content">
                    <div 
                      className="option-icon" 
                      style={{ 
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
                        opacity: item.position === 'center' ? 1 : 0
                      }}
                    >
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <span>{item.name}</span>
                    {item.position === 'center' && (
                      <div className="active-underline"></div>
                    )}
                  </div>
                  {item.position === 'center' && (
                    <div className="option-glow"></div>
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
          
          {/* Perfil de usuario avanzado */}
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
            
            {/* Menú desplegable del usuario con efectos */}
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
                  <div className="menu-item">
                    <i className="fas fa-bell"></i>
                    <span>Notifications</span>
                    <div className="notification-badge">3</div>
                  </div>
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
      
      {/* Contenido principal con animaciones mejoradas */}
      <main className="main-content">
        {/* Contenedor de bienvenida con efecto de texto */}
        <div className="welcome-container welcome-container-top">
          <h1 className="welcome-title">
            <span className="highlight">Welcome</span> to TherapySync
            <div className="title-decoration"></div>
          </h1>
          <p className="welcome-subtitle">
            Select an option from the navigation menu to get started
            <span className="cursor-blink">_</span>
          </p>
        </div>
        
        {/* Componente de información mejorado */}
        <InfoWelcome />
      </main>
      
      {/* Componente de Asistente IA con carga condicional */}
      {showAIAssistant && <AIAssistant />}
    </div>
  );
};

export default HomePage;