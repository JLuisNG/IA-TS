import React, { useState, useEffect, useRef } from 'react';
import '../../styles/accounting/TherapistPaymentModal.scss';

const TherapistPaymentModal = ({ therapist, period, onClose, onPatientClick }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [modalTransitionClass, setModalTransitionClass] = useState('entering');
  const [showVerifyConfirm, setShowVerifyConfirm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const modalRef = useRef(null);
  
  // Animar entrada del modal
  useEffect(() => {
    // Primero establecer entering para iniciar la animación
    setModalTransitionClass('entering');
    // Luego establecer active después de un pequeño retraso para permitir la transición
    const timer = setTimeout(() => {
      setModalTransitionClass('active');
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Detectar clics fuera del modal para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Manejar la salida animada del modal
  const handleClose = () => {
    setModalTransitionClass('exiting');
    setTimeout(() => {
      onClose();
    }, 300); // Tiempo suficiente para que se complete la animación
  };
  
  // Manejar verificación de pago
  const handleVerifyPayment = () => {
    setProcessing(true);
    
    // Simular procesamiento de verificación
    setTimeout(() => {
      setProcessing(false);
      setShowVerifyConfirm(true);
      
      // Cerrar la confirmación después de un tiempo
      setTimeout(() => {
        setShowVerifyConfirm(false);
        handleClose();
      }, 1500);
    }, 1200);
  };
  
  // Formatear valores monetarios
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Obtener el color e ícono según el rol
  const getRoleStyle = (role) => {
    switch (role) {
      case 'PT':
        return { icon: 'fa-walking', color: 'var(--pt-color, #36D1DC)' };
      case 'PTA':
        return { icon: 'fa-walking', color: 'var(--pta-color, #5B86E5)' };
      case 'OT':
        return { icon: 'fa-hands', color: 'var(--ot-color, #FF9966)' };
      case 'COTA':
        return { icon: 'fa-hands', color: 'var(--cota-color, #FF5E62)' };
      case 'ST':
        return { icon: 'fa-comment-medical', color: 'var(--st-color, #56CCF2)' };
      case 'STA':
        return { icon: 'fa-comment-medical', color: 'var(--sta-color, #2F80ED)' };
      default:
        return { icon: 'fa-user-md', color: 'var(--default-color, #64B5F6)' };
    }
  };
  
  // Calcular estadísticas adicionales
  const averageRevenuePerVisit = therapist.earnings / therapist.visits;
  const completedVisits = therapist.visits - therapist.pendingVisits;

  return (
    <div className={`therapist-payment-modal-overlay ${modalTransitionClass}`}>
      <div className="therapist-payment-modal" ref={modalRef}>
        <div className="modal-header">
          <div 
            className="close-button" 
            onClick={handleClose}
            title="Close"
          >
            <i className="fas fa-times"></i>
          </div>
          
          <div className="therapist-info">
            <div 
              className="therapist-avatar"
              style={{ 
                '--role-color': getRoleStyle(therapist.role).color
              }}
            >
              {therapist.avatar ? (
                <img src={therapist.avatar} alt={therapist.name} />
              ) : (
                <div className="avatar-placeholder">
                  {therapist.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div className="role-badge">
                <i className={`fas ${getRoleStyle(therapist.role).icon}`}></i>
                {therapist.role}
              </div>
            </div>
            
            <div className="therapist-details">
              <h2>{therapist.name}</h2>
              <div className="status-info">
                <div className="visits-info">
                  <i className="fas fa-calendar-check"></i>
                  <span>{therapist.visits} visits</span>
                </div>
                <div className={`status-badge ${therapist.status}`}>
                  <i className={`fas ${therapist.status === 'verified' ? 'fa-check-circle' : 'fa-clock'}`}></i>
                  <span>{therapist.status === 'verified' ? 'Verified' : 'Pending Verification'}</span>
                </div>
              </div>
            </div>
            
            <div className="earnings-summary">
              <div className="earnings-value">
                {formatCurrency(therapist.earnings)}
              </div>
              <div className="earnings-period">
                {period ? period.period : 'Current Period'}
              </div>
            </div>
          </div>
          
          <div className="modal-tabs">
            <button 
              className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveTab('summary')}
            >
              <i className="fas fa-chart-pie"></i>
              <span>Summary</span>
            </button>
            <button 
              className={`tab-button ${activeTab === 'patients' ? 'active' : ''}`}
              onClick={() => setActiveTab('patients')}
            >
              <i className="fas fa-user-injured"></i>
              <span>Patients</span>
            </button>
            <button 
              className={`tab-button ${activeTab === 'visits' ? 'active' : ''}`}
              onClick={() => setActiveTab('visits')}
            >
              <i className="fas fa-clipboard-list"></i>
              <span>Visits</span>
            </button>
          </div>
        </div>
        
        <div className="modal-body">
          {activeTab === 'summary' && (
            <div className="summary-tab">
              <div className="metrics-row">
                <div className="metric-box">
                  <div className="metric-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">{formatCurrency(therapist.earnings)}</div>
                    <div className="metric-label">Total Earnings</div>
                  </div>
                </div>
                
                <div className="metric-box">
                  <div className="metric-icon">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">{therapist.visits}</div>
                    <div className="metric-label">Total Visits</div>
                  </div>
                </div>
                
                <div className="metric-box">
                  <div className="metric-icon">
                    <i className="fas fa-calculator"></i>
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">{formatCurrency(averageRevenuePerVisit)}</div>
                    <div className="metric-label">Average Per Visit</div>
                  </div>
                </div>
                
                <div className="metric-box">
                  <div className="metric-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">{therapist.patients ? therapist.patients.length : 0}</div>
                    <div className="metric-label">Unique Patients</div>
                  </div>
                </div>
              </div>
              
              <div className="stats-cards">
                <div className="stats-card visits-stats">
                  <h3>Visit Completion</h3>
                  <div className="stats-content">
                    <div className="stats-chart">
                      <div className="progress-circle">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                          <path
                            className="circle-bg"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="circle"
                            strokeDasharray={`${therapist.completionRate}, 100`}
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <text x="18" y="20.35" className="percentage">{therapist.completionRate}%</text>
                        </svg>
                      </div>
                    </div>
                    <div className="stats-details">
                      <div className="stat-item">
                        <div className="stat-label">Completed Visits</div>
                        <div className="stat-value">{completedVisits}</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">Pending Visits</div>
                        <div className="stat-value">{therapist.pendingVisits}</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">Completion Rate</div>
                        <div className="stat-value">{therapist.completionRate}%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="stats-card payment-stats">
                  <h3>Payment Status</h3>
                  <div className="stats-content">
                    <div className="payment-status">
                      <div className={`status-icon ${therapist.status}`}>
                        <i className={`fas ${therapist.status === 'verified' ? 'fa-check-circle' : 'fa-hourglass-half'}`}></i>
                      </div>
                      <div className="status-details">
                        <div className="status-label">
                          {therapist.status === 'verified' ? 'Payment Verified' : 'Pending Verification'}
                        </div>
                        <div className="status-description">
                          {therapist.status === 'verified' 
                            ? 'Payment has been verified and processed.' 
                            : 'Payment requires verification before processing.'}
                        </div>
                      </div>
                    </div>
                    
                    {therapist.status !== 'verified' && (
                      <button 
                        className={`verify-button ${processing ? 'processing' : ''}`}
                        onClick={handleVerifyPayment}
                        disabled={processing}
                      >
                        {processing ? (
                          <>
                            <div className="spinner"></div>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <i className="fas fa-check-circle"></i>
                            <span>Verify Payment</span>
                          </>
                        )}
                      </button>
                    )}
                    
                    {showVerifyConfirm && (
                      <div className="verification-confirmation">
                        <i className="fas fa-check-circle"></i>
                        <span>Payment Verified Successfully</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'patients' && (
            <div className="patients-tab">
              <div className="tab-header">
                <h3>Patient Visits & Revenue</h3>
                <div className="header-actions">
                  <button className="action-button">
                    <i className="fas fa-file-export"></i>
                    <span>Export</span>
                  </button>
                </div>
              </div>
              
              {therapist.patients && therapist.patients.length > 0 ? (
                <div className="patients-list">
                  <div className="table-header">
                    <div className="header-cell">Patient</div>
                    <div className="header-cell">Visits</div>
                    <div className="header-cell">Revenue</div>
                    <div className="header-cell">Last Visit</div>
                    <div className="header-cell">Actions</div>
                  </div>
                  
                  <div className="table-body">
                    {therapist.patients.map(patient => (
                      <div key={patient.id} className="patient-row">
                        <div className="cell patient-info">
                          <div className="patient-avatar">
                            <div className="avatar-placeholder">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <div className="patient-details">
                            <div className="patient-name">{patient.name}</div>
                            <div className="patient-id">ID: {patient.id}</div>
                          </div>
                        </div>
                        <div className="cell visits-cell">
                          <div className="value">{patient.visits}</div>
                        </div>
                        <div className="cell revenue-cell">
                          <div className="value">{formatCurrency(patient.revenue)}</div>
                        </div>
                        <div className="cell last-visit-cell">
                          <div className="value">{formatDate(patient.lastVisit)}</div>
                        </div>
                        <div className="cell actions-cell">
                          <button 
                            className="view-patient-btn"
                            onClick={() => onPatientClick(patient.id)}
                          >
                            <i className="fas fa-external-link-alt"></i>
                            <span>View Profile</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-patients">
                  <div className="no-data-icon">
                    <i className="fas fa-user-injured"></i>
                  </div>
                  <h4>No patients found</h4>
                  <p>There are no patients assigned to this therapist for the selected period.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'visits' && (
            <div className="visits-tab">
              <div className="tab-header">
                <h3>Visit Details</h3>
                <div className="filter-controls">
                  <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search visits..." />
                  </div>
                  <div className="date-filter">
                    <button className="filter-btn">
                      <i className="fas fa-calendar-alt"></i>
                      <span>Filter by Date</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="visit-details-table">
                <div className="table-header">
                  <div className="header-cell">Date & Time</div>
                  <div className="header-cell">Patient</div>
                  <div className="header-cell">Visit Type</div>
                  <div className="header-cell">Duration</div>
                  <div className="header-cell">Status</div>
                  <div className="header-cell">Amount</div>
                </div>
                
                <div className="table-body visits-list">
                  {/* Datos simulados para completar la vista */}
                  {therapist.patients && therapist.patients.map((patient, index) => (
                    [...Array(Math.min(2, patient.visits))].map((_, visitIndex) => {
                      const visitDate = new Date(patient.lastVisit);
                      visitDate.setDate(visitDate.getDate() - visitIndex * 2);
                      
                      return (
                        <div 
                          key={`${patient.id}-${visitIndex}`} 
                          className="visit-row"
                        >
                          <div className="cell date-cell">
                            <div className="visit-datetime">
                              <div className="visit-date">{formatDate(visitDate)}</div>
                              <div className="visit-time">{`${1 + Math.floor(Math.random() * 12)}:${Math.random() > 0.5 ? '30' : '00'} ${Math.random() > 0.5 ? 'AM' : 'PM'}`}</div>
                            </div>
                          </div>
                          <div className="cell patient-cell">
                            <div className="patient-name">{patient.name}</div>
                          </div>
                          <div className="cell visit-type-cell">
                            <div className="visit-type">
                              {visitIndex === 0 ? 'Standard' : Math.random() > 0.7 ? 'Initial Eval' : 'Standard'}
                            </div>
                          </div>
                          <div className="cell duration-cell">
                            <div className="duration">{30 + Math.floor(Math.random() * 4) * 15} min</div>
                          </div>
                          <div className="cell status-cell">
                            <div className={`status-badge ${Math.random() > 0.3 ? 'completed' : 'pending'}`}>
                              {Math.random() > 0.3 ? 'Completed' : 'Pending'}
                            </div>
                          </div>
                          <div className="cell amount-cell">
                            <div className="amount">{formatCurrency(75 + Math.floor(Math.random() * 6) * 5)}</div>
                          </div>
                        </div>
                      );
                    })
                  )).flat()}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <div className="payment-period-info">
            <i className="fas fa-calendar-alt"></i>
            <span>Payment Period: {period ? period.period : 'Current Period'}</span>
          </div>
          
          <div className="footer-actions">
            <button className="secondary-btn" onClick={handleClose}>
              <i className="fas fa-times"></i>
              <span>Close</span>
            </button>
            <button className="primary-btn">
              <i className="fas fa-print"></i>
              <span>Print Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistPaymentModal;