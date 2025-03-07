import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Welcome/AIAssistant.scss';

const AIAssistant = () => {
  // Estados para controlar el comportamiento del asistente
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const inputRef = useRef(null);
  
  // Sugerencias rápidas para mostrar al usuario
  const quickSuggestions = [
    { icon: 'fa-calendar-plus', text: 'Agendar cita', color: '#3B82F6' },
    { icon: 'fa-user-plus', text: 'Nuevo paciente', color: '#10B981' },
    { icon: 'fa-file-medical', text: 'Historial médico', color: '#F59E0B' },
    { icon: 'fa-chart-line', text: 'Ver reportes', color: '#8B5CF6' }
  ];
  
  // Efecto para iniciar animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setAnimationClass('fadeIn');
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Efecto para auto-focus en el input cuando se expande
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [isExpanded]);
  
  // Manejador para expandir/contraer el asistente
  const toggleAssistant = () => {
    if (isExpanded) {
      // Animar salida antes de colapsar
      setAnimationClass('slideDown');
      setTimeout(() => {
        setIsExpanded(false);
        setAnimationClass('');
      }, 300);
    } else {
      setIsExpanded(true);
      setAnimationClass('slideUp');
    }
    setIsTyping(false);
  };
  
  // Manejador para el input del usuario
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };
  
  // Manejador para enviar la consulta
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    
    // Aquí se procesaría la consulta con la IA
    console.log('Procesando consulta:', query);
    
    // Efecto de envío exitoso
    const button = document.querySelector('.send-button.active');
    if (button) {
      button.classList.add('sent');
      setTimeout(() => {
        button.classList.remove('sent');
      }, 1000);
    }
    
    // Limpiamos el input después de enviar
    setQuery('');
    setIsTyping(false);
  };
  
  // Manejador para las sugerencias rápidas
  const handleSuggestionClick = (suggestion) => {
    // Aquí se procesaría la acción rápida
    console.log('Acción rápida seleccionada:', suggestion);
    
    // Efecto visual de selección
    const suggestionElements = document.querySelectorAll('.suggestion-item');
    suggestionElements.forEach(el => {
      el.classList.remove('active');
      if (el.textContent.includes(suggestion.text)) {
        el.classList.add('active');
        setTimeout(() => {
          el.classList.remove('active');
        }, 500);
      }
    });
  };

  // Si no es visible aún, no renderizar nada
  if (!isVisible) return null;

  return (
    <div className={`ai-assistant-container ${isExpanded ? 'expanded' : ''}`}>
      {/* Barra de asistente colapsada */}
      <div className="assistant-collapsed" onClick={toggleAssistant}>
        <div className="assistant-icon">
          <i className="fas fa-robot"></i>
        </div>
        <div className="assistant-prompt">
          <span>¿En qué puedo ayudarte hoy?</span>
        </div>
        <div className="assistant-toggle">
          <i className={`fas fa-chevron-${isExpanded ? 'down' : 'up'}`}></i>
        </div>
      </div>
      
      {/* Panel expandido del asistente */}
      {isExpanded && (
        <div className={`assistant-expanded ${animationClass}`}>
          {/* Sugerencias rápidas */}
          <div className="quick-suggestions">
            <h4>Acciones rápidas</h4>
            <div className="suggestions-list">
              {quickSuggestions.map((suggestion, index) => (
                <button 
                  key={index} 
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{'--suggestion-color': suggestion.color}}
                >
                  <div className="suggestion-icon">
                    <i className={`fas ${suggestion.icon}`}></i>
                  </div>
                  <span>{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Formulario de consulta */}
          <form className="assistant-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <div className="input-icon">
                <i className="fas fa-search"></i>
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Escribe tu consulta o instrucción..."
                value={query}
                onChange={handleInputChange}
              />
              <button 
                type="submit" 
                className={`send-button ${isTyping ? 'active' : ''}`}
                disabled={!isTyping}
              >
                <i className="fas fa-paper-plane"></i>
                <span className="send-ripple"></span>
              </button>
            </div>
          </form>
          
          {/* Texto de ayuda */}
          <div className="assistant-help">
            <p>
              <i className="fas fa-info-circle"></i>
              Puedes preguntar sobre pacientes, citas, facturas o solicitar asistencia técnica.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;