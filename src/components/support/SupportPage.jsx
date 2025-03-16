import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/support/Support.scss';
import SupportHeader from './SupportHeader.jsx';
import SupportTickets from './SupportTickets.jsx';
import SupportKnowledgeBase from './SupportKnowledgeBase.jsx';
import SupportChat from './SupportChat.jsx';
import SupportCorporateEmail from './SupportCorporateEmail.jsx';
import SupportStats from './SupportStats.jsx';

const SupportPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(7);
  const [parallaxPosition, setParallaxPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  // Datos para estadísticas de soporte
  const supportStats = {
    ticketsResolved: 1248,
    avgResponseTime: '1h 24m',
    customerSatisfaction: 96.7,
    openTickets: 27,
    urgentTickets: 4
  };
  
  // Efecto para cargar la página
  useEffect(() => {
    // Mostrar animación de carga
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    // Efecto para activar el parallax en el fondo
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { clientX, clientY } = e;
        const { width, height } = containerRef.current.getBoundingClientRect();
        
        // Calcular posición relativa al centro
        const xPos = (clientX / width - 0.5) * 15;
        const yPos = (clientY / height - 0.5) * 10;
        
        setParallaxPosition({ x: xPos, y: yPos });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Manejo de cambio de sección
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  
  // Renderizar contenido de la sección activa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'tickets':
        return <SupportTickets />;
      case 'knowledge':
        return <SupportKnowledgeBase />;
      case 'chat':
        return <SupportChat />;
      case 'email':
        return <SupportCorporateEmail />;
      default:
        return (
          <div className="support-dashboard">
            <SupportStats stats={supportStats} />
            <div className="dashboard-sections">
              <div className="dashboard-column">
                <SupportTickets preview={true} />
              </div>
              <div className="dashboard-column">
                <SupportKnowledgeBase preview={true} />
              </div>
            </div>
          </div>
        );
    }
  };
  
  // Animación de partículas de fondo
  const renderParticles = () => {
    const particles = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 5 + 3;
      const opacity = Math.random() * 0.3 + 0.1;
      const delay = Math.random() * 5;
      
      particles.push(
        <div
          key={i}
          className="support-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity,
            animationDelay: `${delay}s`
          }}
        ></div>
      );
    }
    
    return particles;
  };
  
  return (
    <div 
      className={`support-page ${isLoading ? 'is-loading' : 'is-loaded'}`}
      ref={containerRef}
    >
      {/* Fondo con efecto parallax */}
      <div 
        className="support-background"
        style={{ 
          transform: `translate(${parallaxPosition.x}px, ${parallaxPosition.y}px) scale(1.1)` 
        }}
      >
        <div className="support-gradient-overlay"></div>
        <div className="support-particles-container">
          {renderParticles()}
        </div>
      </div>
      
      {/* Animación de carga */}
      {isLoading && (
        <div className="support-loader">
          <div className="loader-circle"></div>
          <div className="loader-text">Loading Support Center</div>
        </div>
      )}
      
      {/* Contenido principal */}
      <div className={`support-content ${isLoading ? 'hidden' : ''}`}>
        <SupportHeader 
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notificationCount={notificationCount}
        />
        
        <main className="support-main">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default SupportPage;