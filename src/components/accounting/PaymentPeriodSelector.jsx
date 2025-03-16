import React, { useState, useEffect, useRef } from 'react';
import '../../styles/accounting/PaymentPeriodSelector.scss';

const PaymentPeriodSelector = ({ periods, selectedPeriod, onPeriodChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animatedPeriods, setAnimatedPeriods] = useState([]);
  const containerRef = useRef(null);
  
  // Efecto para animación de entrada escalonada de los períodos
  useEffect(() => {
    if (periods.length > 0) {
      // Clonar períodos para no mutar los originales
      const periodsWithAnimation = [...periods];
      
      // Agregar períodos con delay para animación escalonada
      const timer = setTimeout(() => {
        setAnimatedPeriods(periodsWithAnimation);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [periods]);
  
  // Efecto para cerrar el selector al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Función para determinar la clase de estado
  const getStatusClass = (status) => {
    switch (status) {
      case 'paid':
        return 'status-paid';
      case 'pending':
        return 'status-pending';
      case 'upcoming':
        return 'status-upcoming';
      default:
        return '';
    }
  };
  
  // Función para obtener el icono según el estado
  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return 'fa-check-circle';
      case 'pending':
        return 'fa-clock';
      case 'upcoming':
        return 'fa-calendar-alt';
      default:
        return 'fa-circle';
    }
  };
  
  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'upcoming':
        return 'Upcoming';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="payment-period-selector" ref={containerRef}>
      {/* Período seleccionado actualmente */}
      <div 
        className={`selected-period ${isExpanded ? 'expanded' : ''}`} 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {selectedPeriod ? (
          <div className="period-info">
            <div className="period-main">
              <div className={`period-status ${getStatusClass(selectedPeriod.status)}`}>
                <i className={`fas ${getStatusIcon(selectedPeriod.status)}`}></i>
                <span>{getStatusText(selectedPeriod.status)}</span>
              </div>
              <div className="period-dates">
                <span className="period-range">{selectedPeriod.period}</span>
                <span className="payment-date">Payment: {selectedPeriod.paymentDate}</span>
              </div>
            </div>
            <div className="period-arrow">
              <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
            </div>
          </div>
        ) : (
          <div className="no-period-selected">
            <i className="fas fa-calendar-alt"></i>
            <span>Select a payment period</span>
          </div>
        )}
      </div>
      
      {/* Dropdown con todos los períodos disponibles */}
      {isExpanded && (
        <div className="period-dropdown">
          <div className="period-timeline">
            {animatedPeriods.map((period, index) => (
              <div 
                key={period.id}
                className={`timeline-item ${getStatusClass(period.status)} ${selectedPeriod && selectedPeriod.id === period.id ? 'active' : ''}`}
                onClick={() => {
                  onPeriodChange(period);
                  setIsExpanded(false);
                }}
                style={{
                  '--animation-order': index,
                }}
              >
                <div className="timeline-connector">
                  <div className="connector-line"></div>
                  <div className="connector-dot"></div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-period">{period.period}</span>
                    <div className={`timeline-status ${getStatusClass(period.status)}`}>
                      <i className={`fas ${getStatusIcon(period.status)}`}></i>
                      <span>{getStatusText(period.status)}</span>
                    </div>
                  </div>
                  <div className="timeline-details">
                    <div className="payment-info">
                      <i className="fas fa-calendar-check"></i>
                      <span>Payment: {period.paymentDate}</span>
                    </div>
                    
                    {period.status === 'paid' && (
                      <div className="paid-info">
                        <i className="fas fa-money-check-alt"></i>
                        <span>Processed</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {selectedPeriod && selectedPeriod.id === period.id && (
                  <div className="timeline-active-indicator">
                    <i className="fas fa-check"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="period-legend">
            <div className="legend-item">
              <div className="legend-color status-paid"></div>
              <span>Paid</span>
            </div>
            <div className="legend-item">
              <div className="legend-color status-pending"></div>
              <span>Pending</span>
            </div>
            <div className="legend-item">
              <div className="legend-color status-upcoming"></div>
              <span>Upcoming</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPeriodSelector;