import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Welcome/AIAssistant.scss';

const AIAssistant = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  
  // Sugerencias rápidas para mostrar al usuario
  const quickSuggestions = [
    { icon: 'fa-calendar-plus', text: 'Agendar cita' },
    { icon: 'fa-user-plus', text: 'Nuevo paciente' },
    { icon: 'fa-file-medical', text: 'Historial médico' },
    { icon: 'fa-chart-line', text: 'Ver reportes' }
  ];
  
  // Efecto para simular que la IA está escribiendo
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);
  
  // Manejador para expandir/contraer el asistente
  const toggleAssistant = () => {
    setIsExpanded(!isExpanded);
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
    
    // Limpiamos el input después de enviar
    setQuery('');
    setIsTyping(false);
  };
  
  // Manejador para las sugerencias rápidas
  const handleSuggestionClick = (suggestion) => {
    // Aquí se procesaría la acción rápida
    console.log('Acción rápida seleccionada:', suggestion);
  };

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
        <div className="assistant-expanded">
          {/* Sugerencias rápidas */}
          <div className="quick-suggestions">
            <h4>Acciones rápidas</h4>
            <div className="suggestions-list">
              {quickSuggestions.map((suggestion, index) => (
                <button 
                  key={index} 
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <i className={`fas ${suggestion.icon}`}></i>
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