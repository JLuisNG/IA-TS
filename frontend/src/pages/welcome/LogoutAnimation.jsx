import React, { useEffect, useState } from 'react';
import '../../styles/HomePage/LogoutAnimation.scss';

const LogoutAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Mensajes de proceso para el cierre de sesión - más profesionales
  const logoutSteps = [
    "Finalizando sesión...",
    "Cerrando puertos seguros...",
    "Cerrando conexiones de BD...",
    "Eliminando tokens temporales...",
    "Completando proceso..."
  ];
  
  useEffect(() => {
    // Incrementar progreso continuamente
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 - prev) / 12;
        return newProgress > 99 ? 99 : newProgress;
      });
    }, 100);
    
    // Cambiar paso cada 800ms
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1;
        
        // Al llegar al último paso, asegurar que el progreso llegue a 100%
        if (next >= logoutSteps.length - 1) {
          clearInterval(progressInterval);
          setProgress(100);
        }
        
        return next < logoutSteps.length ? next : prev;
      });
    }, 800);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [logoutSteps.length]);
  
  return (
    <div className="logout-animation-container">
      {/* Fondo oscuro con desenfoque */}
      <div className="backdrop"></div>
      
      <div className="logout-modal">
        {/* Ícono superior */}
        <div className="logout-icon">
          <i className="fas fa-power-off"></i>
        </div>
        
        {/* Título */}
        <h2 className="logout-title">Logging Out</h2>
        
        {/* Mensaje de estado */}
        <div className="status-message">
          {logoutSteps[currentStep]}
        </div>
        
        {/* Barra de progreso */}
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Consola minimalista */}
        <div className="console-window">
          <div className="console-header">
            <span className="console-title">system_logout.sh</span>
            <div className="console-controls">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="console-body">
            <div className="console-line">$ initiating_session_termination</div>
            {currentStep >= 1 && (
              <div className="console-line">$ closing_secure_ports: 443, 8080</div>
            )}
            {currentStep >= 2 && (
              <div className="console-line">$ disconnecting_database: SUCCESS</div>
            )}
            {currentStep >= 3 && (
              <div className="console-line">$ removing_auth_tokens: IN_PROGRESS</div>
            )}
            {currentStep >= 4 && (
              <div className="console-line">$ session_terminated: REDIRECTING</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutAnimation;