import React, { useEffect, useState } from 'react';

const AuthLoadingModal = ({ isOpen, status, message, onClose, modalType = 'auth' }) => {
  const [progress, setProgress] = useState(0);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showStatusIcon, setShowStatusIcon] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animateBg, setAnimateBg] = useState(false);
  
  // Pasos del proceso según el tipo de modal
  const steps = modalType === 'auth' ? [
    'Verificando credenciales...',
    'Autenticando usuario...',
    'Validando permisos...',
    'Obteniendo datos del perfil...',
    'Preparando sesión...'
  ] : [
    'Preparando solicitud...',
    'Verificando email...',
    'Enviando enlace...',
    'Finalizando proceso...'
  ];
  
  // Efecto para animar el fondo
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setAnimateBg(true);
      }, 100);
    } else {
      setAnimateBg(false);
    }
  }, [isOpen]);
  
  // Efecto para manejar la animación de progreso
  useEffect(() => {
    let interval;
    let stepInterval;
    
    if (isOpen && status === 'loading') {
      // Resetear estados al abrirse
      setProgress(0);
      setShowSpinner(true);
      setShowStatusIcon(false);
      setCurrentStep(0);
      
      // Animar el progreso - más rápido y fluido
      interval = setInterval(() => {
        setProgress(prev => {
          // Incrementar progreso con velocidad variable pero más rápido
          const increment = Math.random() * 10 + (prev < 40 ? 8 : prev < 70 ? 4 : 2);
          const newProgress = prev + increment;
          return newProgress > 95 ? 95 : newProgress; // Mantener en 95% hasta completar
        });
      }, 200);
      
      // Cambiar el paso actual periódicamente - más lento para mejor visualización
      stepInterval = setInterval(() => {
        setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 1600);
      
    } else if (status === 'success' || status === 'error') {
      // Completar el progreso
      setProgress(100);
      
      // Mostrar el ícono correspondiente después de completar la animación
      const timeout = setTimeout(() => {
        setShowSpinner(false);
        setShowStatusIcon(true);
        
        // Si es error, cerrar automáticamente después de un tiempo más corto
        if (status === 'error') {
          setTimeout(() => {
            if (onClose) onClose();
          }, 1500);
        }
      }, 300);
      
      return () => clearTimeout(timeout);
    }
    
    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [isOpen, status, steps.length, onClose]);
  
  // Si no está abierto, no renderizar nada
  if (!isOpen) return null;
  
  // Determinar el mensaje a mostrar
  const displayMessage = status === 'loading' 
    ? steps[currentStep] 
    : message;
  
  return (
    <div className={`auth-loading-overlay ${isOpen ? 'show' : ''} ${animateBg ? 'animate-bg' : ''} ${status === 'error' ? 'error-bg' : status === 'success' ? 'success-bg' : ''}`}>
      <div className="auth-loading-content">
        <div className="glow-effect"></div>
        
        <div className="auth-loading-spinner">
          {showSpinner && (
            <>
              <div className="spinner-circle outer"></div>
              <div className="spinner-circle middle"></div>
              <div className="spinner-circle inner"></div>
              
              {/* Destellos decorativos mejorados */}
              <div className="spinner-sparkles">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="sparkle" style={{
                    animationDelay: `${i * 0.3}s`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${6 + Math.random() * 8}px`,
                    height: `${6 + Math.random() * 8}px`
                  }}></div>
                ))}
              </div>
              
              {/* Anillos de pulso */}
              <div className="pulse-rings">
                <div className="pulse-ring ring1"></div>
                <div className="pulse-ring ring2"></div>
                <div className="pulse-ring ring3"></div>
              </div>
            </>
          )}
          
          {showStatusIcon && status === 'success' && (
            <div className="check-icon show">
              <i className="fas fa-check-circle"></i>
            </div>
          )}
          
          {showStatusIcon && status === 'error' && (
            <div className="error-icon show">
              <i className="fas fa-times-circle"></i>
            </div>
          )}
        </div>
        
        <h3 className={status !== 'loading' ? status : ''}>
          {status === 'loading' ? 'Procesando' : status === 'success' ? '¡Éxito!' : 'Error'}
        </h3>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-bar-inner" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="progress-percentage">
            {Math.round(progress)}%
          </div>
        </div>
        
        <div className={`status-message ${status !== 'loading' ? status : ''}`}>
          {displayMessage}
        </div>
        
        {status === 'loading' && (
          <div className="auth-loading-steps">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`step-indicator ${index === currentStep ? 'current' : index < currentStep ? 'completed' : ''}`}
              >
                <div className="step-dot">
                  {index < currentStep && <i className="fas fa-check"></i>}
                </div>
                <div className="step-name">{step}</div>
              </div>
            ))}
          </div>
        )}
        
        {/* No botón de cierre, todo es automático */}
      </div>
    </div>
  );
};

export default AuthLoadingModal;