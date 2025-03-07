import React, { useState, useEffect } from 'react';
import '../../styles/Welcome/InfoWelcome.scss';

const InfoWelcome = () => {
  // Estado para animaciones
  const [animatedStats, setAnimatedStats] = useState({
    activePatients: 0
  });
  const [isHovering, setIsHovering] = useState({
    patients: false,
    support: false,
    guide: false
  });
  
  // Datos reales que se mostrarán al final de la animación
  const stats = {
    activePatients: 128
  };
  
  // Efecto para animar contador de pacientes
  useEffect(() => {
    const duration = 2000; // duración en ms
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      // Función de easing para un movimiento más natural
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedStats({
        activePatients: Math.round(eased * stats.activePatients)
      });
      
      if (current >= steps) {
        clearInterval(timer);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [stats.activePatients]);
  
  // Manejadores para hover de tarjetas
  const handleCardHover = (card, isHovering) => {
    setIsHovering(prev => ({
      ...prev,
      [card]: isHovering
    }));
  };

  return (
    <div className="info-welcome-container">
      {/* Tarjetas principales */}
      <div className="dashboard-cards">
        {/* Tarjeta de pacientes */}
        <div 
          className={`dashboard-card ${isHovering.patients ? 'hover' : ''}`}
          onMouseEnter={() => handleCardHover('patients', true)}
          onMouseLeave={() => handleCardHover('patients', false)}
        >
          <div className="card-content">
            <div className="card-header">
              <div className="icon-container patients-icon">
                <i className="fas fa-user-injured"></i>
              </div>
              <h3>Pacientes Activos</h3>
            </div>
            <div className="card-value">
              <span className="counter">{animatedStats.activePatients}</span>
            </div>
            <div className="card-footer">
              <button className="action-button">
                <i className="fas fa-clipboard-list"></i>
                <span>Ver listado</span>
              </button>
            </div>
          </div>
          <div className="card-bg-decoration"></div>
        </div>
        
        {/* Tarjeta de soporte */}
        <div 
          className={`dashboard-card ${isHovering.support ? 'hover' : ''}`}
          onMouseEnter={() => handleCardHover('support', true)}
          onMouseLeave={() => handleCardHover('support', false)}
        >
          <div className="card-content">
            <div className="card-header">
              <div className="icon-container support-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>Soporte Prioritario</h3>
            </div>
            <div className="card-description">
              <p>Asistencia técnica inmediata</p>
              <div className="support-status">
                <span className="status-dot"></span>
                <span>Disponible 24/7</span>
              </div>
            </div>
            <div className="card-footer">
              <button className="action-button">
                <i className="fas fa-comments"></i>
                <span>Iniciar chat</span>
              </button>
            </div>
          </div>
          <div className="card-bg-decoration"></div>
        </div>
        
        {/* Tarjeta de guía */}
        <div 
          className={`dashboard-card ${isHovering.guide ? 'hover' : ''}`}
          onMouseEnter={() => handleCardHover('guide', true)}
          onMouseLeave={() => handleCardHover('guide', false)}
        >
          <div className="card-content">
            <div className="card-header">
              <div className="icon-container guide-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <h3>Centro de Aprendizaje</h3>
            </div>
            <div className="card-description">
              <p>Recursos y tutoriales para optimizar su experiencia</p>
            </div>
            <div className="card-footer tutorial-options">
              <button className="tutorial-button">
                <i className="fas fa-play-circle"></i>
                <span>Video tutorial</span>
              </button>
              <button className="tutorial-button">
                <i className="fas fa-file-alt"></i>
                <span>Guía PDF</span>
              </button>
            </div>
          </div>
          <div className="card-bg-decoration"></div>
        </div>
      </div>
    </div>
  );
};

export default InfoWelcome;