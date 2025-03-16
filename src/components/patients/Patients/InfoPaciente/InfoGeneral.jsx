import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarSelector from './CalendarSelector';
import '../../../../styles/Patients/InfoPaciente/InfoGeneral.scss';

const InfoGeneral = ({ patientData }) => {
  const navigate = useNavigate();
  const [showCertDropdown, setShowCertDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  const [certPeriods, setCertPeriods] = useState([
    { id: 1, startDate: "04-19-2023", endDate: "04-19-2025", isActive: true },
    { id: 2, startDate: "12-05-2024", endDate: "02-02-2025", isActive: false },
    { id: 3, startDate: "07-19-2024", endDate: "09-16-2024", isActive: false }
  ]);
  const [activeCertPeriod, setActiveCertPeriod] = useState(certPeriods[0]);
  const [newCertPeriod, setNewCertPeriod] = useState({ startDate: "", endDate: "" });
  const [editingCertPeriod, setEditingCertPeriod] = useState(null);

  // Función para manejar la edición del paciente
  const handleEditPatient = () => {
    navigate(`/editReferral/${patientData.id}`);
  };

  // Función para abrir el modal de edición de certificación
  const handleEditCertification = () => {
    setEditingCertPeriod({...activeCertPeriod});
    setShowEditModal(true);
  };

  // Función para seleccionar un período de certificación
  const handleCertPeriodSelect = (certPeriod) => {
    setActiveCertPeriod(certPeriod);
    setShowCertDropdown(false);
    
    // Actualizar el estado de los períodos
    const updatedPeriods = certPeriods.map(period => ({
      ...period,
      isActive: period.id === certPeriod.id
    }));
    
    setCertPeriods(updatedPeriods);
  };

  // Función para abrir el modal de agregar nuevo período
  const handleAddNewPeriod = () => {
    setNewCertPeriod({ startDate: "", endDate: "" });
    setShowAddModal(true);
    setShowCertDropdown(false);
  };

  // Función para guardar un nuevo período
  const handleSaveNewPeriod = () => {
    if (newCertPeriod.startDate && newCertPeriod.endDate) {
      const newPeriod = {
        id: certPeriods.length + 1,
        startDate: newCertPeriod.startDate,
        endDate: newCertPeriod.endDate,
        isActive: false
      };
      
      setCertPeriods([...certPeriods, newPeriod]);
      setShowAddModal(false);
    }
  };

  // Función para guardar cambios en un período existente
  const handleSaveEditPeriod = () => {
    if (editingCertPeriod.startDate && editingCertPeriod.endDate) {
      const updatedPeriods = certPeriods.map(period => 
        period.id === editingCertPeriod.id ? editingCertPeriod : period
      );
      
      setCertPeriods(updatedPeriods);
      
      // Si se está editando el período activo, actualizar ese también
      if (activeCertPeriod.id === editingCertPeriod.id) {
        setActiveCertPeriod(editingCertPeriod);
      }
      
      setShowEditModal(false);
    }
  };

  // Función para manejar la selección de fecha de inicio
  const handleStartDateSelect = (date) => {
    if (showAddModal) {
      setNewCertPeriod({ ...newCertPeriod, startDate: date });
    } else if (showEditModal) {
      setEditingCertPeriod({ ...editingCertPeriod, startDate: date });
    }
    setShowStartDateCalendar(false);
  };

  // Función para manejar la selección de fecha de fin
  const handleEndDateSelect = (date) => {
    if (showAddModal) {
      setNewCertPeriod({ ...newCertPeriod, endDate: date });
    } else if (showEditModal) {
      setEditingCertPeriod({ ...editingCertPeriod, endDate: date });
    }
    setShowEndDateCalendar(false);
  };

  // Calcular el progreso y tiempo restante para el período activo
  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate.replace(/-/g, '/'));
    const end = new Date(endDate.replace(/-/g, '/'));
    const today = new Date();
    
    const totalDuration = end - start;
    const elapsed = today - start;
    
    let progress = Math.round((elapsed / totalDuration) * 100);
    progress = Math.max(0, Math.min(progress, 100)); // Limitar entre 0 y 100
    
    // Calcular meses restantes
    const monthDiff = (end.getFullYear() - today.getFullYear()) * 12 + 
                      (end.getMonth() - today.getMonth());
    
    return {
      progressPercent: progress,
      monthsRemaining: monthDiff > 0 ? monthDiff : 0
    };
  };

  const { progressPercent, monthsRemaining } = calculateProgress(
    activeCertPeriod.startDate,
    activeCertPeriod.endDate
  );

  return (
    <div className="general-section">
      <div className="section-header">
        <h2 className="section-title">
          <i className="fas fa-user-circle"></i> General Information
        </h2>
      </div>

      <div className="card-container">
        {/* Tarjeta de información del paciente */}
        <div className="info-card patient-info">
          <div className="card-header">
            <div className="header-icon">
              <i className="fas fa-user"></i>
            </div>
            <h3>Patient Information</h3>
            <button className="edit-btn" onClick={handleEditPatient}>
              <i className="fas fa-edit"></i> Edit
            </button>
          </div>
          <div className="card-content">
            <div className="info-grid">
              <div className="info-row">
                <div className="info-item">
                  <label>Full Name</label>
                  <p>{patientData.name}</p>
                </div>
                <div className="info-item">
                  <label>Date of Birth</label>
                  <p>{patientData.dob}</p>
                </div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <label>Phone</label>
                  <p>
                    <i className="fas fa-phone text-success"></i>
                    <a href={`tel:${patientData.phone}`} className="phone-link">
                      {patientData.phone}
                    </a>
                  </p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>
                    <i className="fas fa-envelope text-danger"></i>
                    <a href={`mailto:${patientData.email}`} className="email-link">
                      {patientData.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <label>Address</label>
                  <p>
                    <i className="fas fa-map-marker-alt text-danger"></i>
                    {patientData.street}, {patientData.city}, {patientData.state} {patientData.zip}
                  </p>
                </div>
                <div className="info-item">
                  <label>Emergency Contact</label>
                  <p>
                    {patientData.emergencyContact} |
                    <i className="fas fa-phone text-success"></i>
                    <a href={`tel:${patientData.emergencyPhone}`} className="phone-link">
                      {patientData.emergencyPhone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta de información de certificación */}
        <div className="info-card certification-info">
          <div className="card-header">
            <div className="header-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <h3>Certification Period</h3>
            <div className="cert-actions">
              <div className="cert-dropdown-container">
                <button 
                  className="cert-dropdown-trigger"
                  onClick={() => setShowCertDropdown(!showCertDropdown)}
                >
                  <span>{activeCertPeriod.startDate} - {activeCertPeriod.endDate}</span>
                  <i className={`fas fa-chevron-${showCertDropdown ? 'up' : 'down'}`}></i>
                </button>
                
                {showCertDropdown && (
                  <div className="cert-dropdown-menu">
                    {certPeriods.map(period => (
                      <div 
                        key={period.id}
                        className={`cert-option ${period.isActive ? 'active' : ''}`}
                        onClick={() => handleCertPeriodSelect(period)}
                      >
                        {period.startDate} - {period.endDate}
                        {period.isActive && <i className="fas fa-check"></i>}
                      </div>
                    ))}
                    <div className="cert-option add-new" onClick={handleAddNewPeriod}>
                      <i className="fas fa-plus"></i> Add New Period
                    </div>
                  </div>
                )}
              </div>
              
              <button className="edit-btn" onClick={handleEditCertification}>
                <i className="fas fa-edit"></i> Edit
              </button>
            </div>
          </div>
          <div className="card-content">
            <div className="cert-period">
              <div className="date-box start-date">
                <span className="date-label">Start Date</span>
                <span className="date-value">{activeCertPeriod.startDate}</span>
              </div>
              <div className="date-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="date-box end-date">
                <span className="date-label">End Date</span>
                <span className="date-value">{activeCertPeriod.endDate}</span>
              </div>
            </div>

            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <span className="progress-text">{monthsRemaining} months remaining</span>
            </div>

            <div className="cert-details">
              <div className="cert-row">
                <div className="cert-item">
                  <label>Insurance</label>
                  <p>{patientData.insurance}</p>
                </div>
                <div className="cert-item">
                  <label>Agency</label>
                  <p>{patientData.agency}</p>
                </div>
              </div>
              <div className="cert-row">
                <div className="cert-item">
                  <label>Therapist</label>
                  <p>
                    <span className="therapist-badge">{patientData.therapistType}</span>
                    {patientData.therapist}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal para agregar nuevo período */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Add New Certification Period</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>Start Date</label>
                <div className="date-input-container">
                  <input 
                    type="text" 
                    placeholder="MM-DD-YYYY"
                    value={newCertPeriod.startDate}
                    onChange={(e) => setNewCertPeriod({...newCertPeriod, startDate: e.target.value})}
                    readOnly
                    onClick={() => setShowStartDateCalendar(true)}
                  />
                  <i className="fas fa-calendar-alt" onClick={() => setShowStartDateCalendar(true)}></i>
                  
                  {showStartDateCalendar && (
                    <div className="calendar-popup">
                      <CalendarSelector 
                        onDateSelect={handleStartDateSelect}
                        initialDate={newCertPeriod.startDate || null}
                        onClose={() => setShowStartDateCalendar(false)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>End Date</label>
                <div className="date-input-container">
                  <input 
                    type="text" 
                    placeholder="MM-DD-YYYY"
                    value={newCertPeriod.endDate}
                    onChange={(e) => setNewCertPeriod({...newCertPeriod, endDate: e.target.value})}
                    readOnly
                    onClick={() => setShowEndDateCalendar(true)}
                  />
                  <i className="fas fa-calendar-alt" onClick={() => setShowEndDateCalendar(true)}></i>
                  
                  {showEndDateCalendar && (
                    <div className="calendar-popup">
                      <CalendarSelector 
                        onDateSelect={handleEndDateSelect}
                        initialDate={newCertPeriod.endDate || null}
                        onClose={() => setShowEndDateCalendar(false)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveNewPeriod}>Save Period</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal para editar período existente */}
      {showEditModal && editingCertPeriod && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Edit Certification Period</h3>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>Start Date</label>
                <div className="date-input-container">
                  <input 
                    type="text" 
                    value={editingCertPeriod.startDate}
                    readOnly
                    onClick={() => setShowStartDateCalendar(true)}
                  />
                  <i className="fas fa-calendar-alt" onClick={() => setShowStartDateCalendar(true)}></i>
                  
                  {showStartDateCalendar && (
                    <div className="calendar-popup">
                      <CalendarSelector 
                        onDateSelect={handleStartDateSelect}
                        initialDate={editingCertPeriod.startDate}
                        onClose={() => setShowStartDateCalendar(false)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>End Date</label>
                <div className="date-input-container">
                  <input 
                    type="text" 
                    value={editingCertPeriod.endDate}
                    readOnly
                    onClick={() => setShowEndDateCalendar(true)}
                  />
                  <i className="fas fa-calendar-alt" onClick={() => setShowEndDateCalendar(true)}></i>
                  
                  {showEndDateCalendar && (
                    <div className="calendar-popup">
                      <CalendarSelector 
                        onDateSelect={handleEndDateSelect}
                        initialDate={editingCertPeriod.endDate}
                        onClose={() => setShowEndDateCalendar(false)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveEditPeriod}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoGeneral;