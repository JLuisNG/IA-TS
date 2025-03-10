import React, { useState, useEffect, useRef } from 'react';
import '../../../styles/Patients/Staffing/StaffEditComponent.scss';

const StaffEditComponent = ({ onBackToOptions }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Conectando con la base de datos...');
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortOption, setSortOption] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('staff');

  // Simulación de carga con mensajes dinámicos
  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage('Conectando con la base de datos...');
    
    const loadingMessages = [
      { message: 'Verificando permisos de usuario...', time: 800 },
      { message: 'Recuperando lista de personal...', time: 1600 },
      { message: 'Cargando documentos asociados...', time: 2400 },
      { message: 'Preparando interfaz de edición...', time: 3200 },
      { message: 'Optimizando rendimiento...', time: 4000 }
    ];
    
    const timeouts = [];
    
    loadingMessages.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setLoadingMessage(item.message);
        if (index === loadingMessages.length - 1) {
          const finalTimeout = setTimeout(() => {
            setIsLoading(false);
            fetchStaffData();
          }, 800);
          timeouts.push(finalTimeout);
        }
      }, item.time);
      
      timeouts.push(timeout);
    });
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Datos simulados de personal
  const fetchStaffData = () => {
    // Simulación de datos del servidor
    const mockData = [
      {
        id: 1,
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@therapysync.com',
        phone: '(310) 555-1234',
        role: 'pt',
        roleDisplay: 'Physical Therapist',
        avatar: null,
        age: 35,
        status: 'active',
        zipCode: '90210',
        address: 'Beverly Hills, CA',
        documents: {
          covidVaccine: { status: 'obtained', file: 'covid_vac_jp.pdf' },
          tbTest: { status: 'obtained', file: 'tb_test_jp.pdf' },
          physicalExam: { status: 'obtained', file: 'phys_exam_jp.pdf' },
          liabilityInsurance: { status: 'obtained', file: 'liability_jp.pdf' },
          driversLicense: { status: 'obtained', file: 'license_jp.pdf' },
          autoInsurance: { status: 'obtained', file: 'auto_ins_jp.pdf' },
          cprCertification: { status: 'obtained', file: 'cpr_cert_jp.pdf' },
          businessLicense: { status: 'pending', file: null }
        },
        userName: 'juanp',
        password: '********',
        patients: 12
      },
      {
        id: 2,
        firstName: 'María',
        lastName: 'González',
        email: 'maria.gonzalez@therapysync.com',
        phone: '(562) 555-6789',
        role: 'ot',
        roleDisplay: 'Occupational Therapist',
        avatar: null,
        age: 29,
        status: 'active',
        zipCode: '90802',
        address: 'Long Beach, CA',
        documents: {
          covidVaccine: { status: 'obtained', file: 'covid_vac_mg.pdf' },
          tbTest: { status: 'obtained', file: 'tb_test_mg.pdf' },
          physicalExam: { status: 'obtained', file: 'phys_exam_mg.pdf' },
          liabilityInsurance: { status: 'obtained', file: 'liability_mg.pdf' },
          driversLicense: { status: 'obtained', file: 'license_mg.pdf' },
          autoInsurance: { status: 'obtained', file: 'auto_ins_mg.pdf' },
          cprCertification: { status: 'obtained', file: 'cpr_cert_mg.pdf' },
          businessLicense: { status: 'obtained', file: 'business_mg.pdf' }
        },
        userName: 'mariag',
        password: '********',
        patients: 8
      },
      {
        id: 3,
        firstName: 'Carlos',
        lastName: 'López',
        email: 'carlos.lopez@therapysync.com',
        phone: '(213) 555-4321',
        role: 'pt',
        roleDisplay: 'Physical Therapist',
        avatar: null,
        age: 41,
        status: 'active',
        zipCode: '90001',
        address: 'Los Angeles, CA',
        documents: {
          covidVaccine: { status: 'obtained', file: 'covid_vac_cl.pdf' },
          tbTest: { status: 'pending', file: null },
          physicalExam: { status: 'obtained', file: 'phys_exam_cl.pdf' },
          liabilityInsurance: { status: 'obtained', file: 'liability_cl.pdf' },
          driversLicense: { status: 'obtained', file: 'license_cl.pdf' },
          autoInsurance: { status: 'obtained', file: 'auto_ins_cl.pdf' },
          cprCertification: { status: 'pending', file: null },
          businessLicense: { status: 'obtained', file: 'business_cl.pdf' }
        },
        userName: 'carlosl',
        password: '********',
        patients: 15
      },
      {
        id: 4,
        firstName: 'Ana',
        lastName: 'Martínez',
        email: 'ana.martinez@therapysync.com',
        phone: '(714) 555-9876',
        role: 'st',
        roleDisplay: 'Speech Therapist',
        avatar: null,
        age: 33,
        status: 'active',
        zipCode: '92805',
        address: 'Anaheim, CA',
        documents: {
          covidVaccine: { status: 'obtained', file: 'covid_vac_am.pdf' },
          tbTest: { status: 'obtained', file: 'tb_test_am.pdf' },
          physicalExam: { status: 'obtained', file: 'phys_exam_am.pdf' },
          liabilityInsurance: { status: 'obtained', file: 'liability_am.pdf' },
          driversLicense: { status: 'obtained', file: 'license_am.pdf' },
          autoInsurance: { status: 'pending', file: null },
          cprCertification: { status: 'obtained', file: 'cpr_cert_am.pdf' },
          businessLicense: { status: 'obtained', file: 'business_am.pdf' }
        },
        userName: 'anam',
        password: '********',
        patients: 10
      },
      {
        id: 5,
        firstName: 'Roberto',
        lastName: 'Sánchez',
        email: 'roberto.sanchez@therapysync.com',
        phone: '(949) 555-5432',
        role: 'pta',
        roleDisplay: 'Physical Therapist Assistant',
        avatar: null,
        age: 27,
        status: 'inactive',
        zipCode: '92602',
        address: 'Irvine, CA',
        documents: {
          covidVaccine: { status: 'obtained', file: 'covid_vac_rs.pdf' },
          tbTest: { status: 'obtained', file: 'tb_test_rs.pdf' },
          physicalExam: { status: 'pending', file: null },
          liabilityInsurance: { status: 'obtained', file: 'liability_rs.pdf' },
          driversLicense: { status: 'obtained', file: 'license_rs.pdf' },
          autoInsurance: { status: 'obtained', file: 'auto_ins_rs.pdf' },
          cprCertification: { status: 'obtained', file: 'cpr_cert_rs.pdf' },
          businessLicense: { status: 'pending', file: null }
        },
        userName: 'robertos',
        password: '********',
        patients: 0
      },
      {
        id: 6,
        firstName: 'Laura',
        lastName: 'Hernández',
        email: 'laura.hernandez@therapysync.com',
        phone: '(626) 555-2468',
        role: 'cota',
        roleDisplay: 'Certified Occupational Therapy Assistant',
        avatar: null,
        age: 31,
        status: 'active',
        zipCode: '91106',
        address: 'Pasadena, CA',
        documents: {
          covidVaccine: { status: 'obtained', file: 'covid_vac_lh.pdf' },
          tbTest: { status: 'obtained', file: 'tb_test_lh.pdf' },
          physicalExam: { status: 'obtained', file: 'phys_exam_lh.pdf' },
          liabilityInsurance: { status: 'obtained', file: 'liability_lh.pdf' },
          driversLicense: { status: 'obtained', file: 'license_lh.pdf' },
          autoInsurance: { status: 'obtained', file: 'auto_ins_lh.pdf' },
          cprCertification: { status: 'obtained', file: 'cpr_cert_lh.pdf' },
          businessLicense: { status: 'obtained', file: 'business_lh.pdf' }
        },
        userName: 'laurah',
        password: '********',
        patients: 6
      },
      {
        id: 7,
        firstName: 'Luis',
        lastName: 'Nava',
        email: 'luis.nava@therapysync.com',
        phone: '(323) 555-3698',
        role: 'administrator',
        roleDisplay: 'Administrator',
        avatar: null,
        age: 38,
        status: 'active',
        zipCode: '90012',
        address: 'Los Angeles, CA',
        documents: {
          covidVaccine: { status: 'obtained', file: 'covid_vac_ln.pdf' },
          tbTest: { status: 'obtained', file: 'tb_test_ln.pdf' },
          physicalExam: { status: 'obtained', file: 'phys_exam_ln.pdf' },
          liabilityInsurance: { status: 'obtained', file: 'liability_ln.pdf' },
          driversLicense: { status: 'obtained', file: 'license_ln.pdf' },
          autoInsurance: { status: 'obtained', file: 'auto_ins_ln.pdf' },
          cprCertification: { status: 'obtained', file: 'cpr_cert_ln.pdf' },
          businessLicense: { status: 'obtained', file: 'business_ln.pdf' }
        },
        userName: 'luisn',
        password: '********',
        patients: 0
      },
      {
        id: 8,
        firstName: 'Sofia',
        lastName: 'Torres',
        email: 'sofia.torres@therapysync.com',
        phone: '(818) 555-7531',
        role: 'st',
        roleDisplay: 'Speech Therapist',
        avatar: null,
        age: 35,
        status: 'active',
        zipCode: '91367',
        address: 'Woodland Hills, CA',
        documents: {
          covidVaccine: { status: 'obtained', file: 'covid_vac_st.pdf' },
          tbTest: { status: 'obtained', file: 'tb_test_st.pdf' },
          physicalExam: { status: 'obtained', file: 'phys_exam_st.pdf' },
          liabilityInsurance: { status: 'pending', file: null },
          driversLicense: { status: 'obtained', file: 'license_st.pdf' },
          autoInsurance: { status: 'obtained', file: 'auto_ins_st.pdf' },
          cprCertification: { status: 'obtained', file: 'cpr_cert_st.pdf' },
          businessLicense: { status: 'pending', file: null }
        },
        userName: 'sofiat',
        password: '********',
        patients: 9
      }
    ];
    
    setStaffList(mockData);
    setFilteredStaff(mockData);
  };

  // Filtrar y ordenar personal
  useEffect(() => {
    let filtered = [...staffList];
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(staff => 
        `${staff.firstName} ${staff.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.phone.includes(searchTerm)
      );
    }
    
    // Filtrar por rol
    if (filterRole !== 'all') {
      filtered = filtered.filter(staff => staff.role === filterRole);
    }
    
    // Ordenar según la opción seleccionada
    switch (sortOption) {
      case 'name-asc':
        filtered.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
        break;
      case 'name-desc':
        filtered.sort((a, b) => `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`));
        break;
      case 'role':
        filtered.sort((a, b) => a.roleDisplay.localeCompare(b.roleDisplay));
        break;
      case 'patients-desc':
        filtered.sort((a, b) => b.patients - a.patients);
        break;
      default:
        break;
    }
    
    setFilteredStaff(filtered);
  }, [staffList, searchTerm, filterRole, sortOption]);

  // Roles disponibles
  const roles = [
    { value: 'administrator', label: 'Administrador' },
    { value: 'pt', label: 'PT - Physical Therapist' },
    { value: 'pta', label: 'PTA - Physical Therapist Assistant' },
    { value: 'ot', label: 'OT - Occupational Therapist' },
    { value: 'cota', label: 'COTA - Certified Occupational Therapy Assistant' },
    { value: 'st', label: 'ST - Speech Therapist' },
    { value: 'sta', label: 'STA - Speech Therapy Assistant' },
  ];

  // Lista de documentos requeridos
  const documentsList = [
    { id: 'covidVaccine', name: 'Proof of COVID Vaccine' },
    { id: 'tbTest', name: 'TB Test proof (PPD/X-Ray)', description: 'PPD Test (valid for 1 year) or X-Ray TB test (valid for 5 years)' },
    { id: 'physicalExam', name: 'Annual Physical Exam Proof' },
    { id: 'liabilityInsurance', name: 'Professional Liability Insurance' },
    { id: 'driversLicense', name: 'Driver\'s License' },
    { id: 'autoInsurance', name: 'Auto Insurance' },
    { id: 'cprCertification', name: 'CPR/BLS Certification' },
    { id: 'businessLicense', name: 'Copy of Business License or EIN' },
  ];

  // Cálculo de métricas
  const calculateMetrics = () => {
    const total = staffList.length;
    const active = staffList.filter(s => s.status === 'active').length;
    const documentsComplete = staffList.filter(s => {
      return Object.values(s.documents).every(doc => doc.status === 'obtained');
    }).length;
    
    return {
      total,
      active,
      documentsComplete,
      documentsCompletePercentage: Math.round((documentsComplete / total) * 100) || 0
    };
  };

  const metrics = calculateMetrics();

  // Manejadores de eventos
  const handleOpenProfile = (staff) => {
    setSelectedStaff(staff);
    setShowProfileModal(true);
    setEditMode(true);
    setActiveTab('info');
  };

  const handleCloseProfile = () => {
    setShowProfileModal(false);
    setSelectedStaff(null);
    setEditMode(false);
  };

  const handleSaveProfile = (updatedStaff) => {
    // Actualizar el personal en la lista
    const updatedStaffList = staffList.map(item => 
      item.id === updatedStaff.id ? updatedStaff : item
    );
    
    setStaffList(updatedStaffList);
    handleCloseProfile();
  };

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  const handleResetPassword = (staffId) => {
    alert(`Contraseña restablecida para el usuario con ID ${staffId}. Un correo ha sido enviado con las instrucciones.`);
  };

  const handleDocumentStatusToggle = (staffId, documentId) => {
    const updatedStaffList = staffList.map(staff => {
      if (staff.id === staffId) {
        return {
          ...staff,
          documents: {
            ...staff.documents,
            [documentId]: {
              ...staff.documents[documentId],
              status: staff.documents[documentId].status === 'obtained' ? 'pending' : 'obtained'
            }
          }
        };
      }
      return staff;
    });
    
    setStaffList(updatedStaffList);
    
    // Si el miembro del personal está seleccionado, actualizar también selectedStaff
    if (selectedStaff && selectedStaff.id === staffId) {
      setSelectedStaff(updatedStaffList.find(staff => staff.id === staffId));
    }
  };

  const handleDocumentViewClick = (documentName, fileName) => {
    // Simulación de visualización de documento
    alert(`Visualizando documento: ${documentName} - ${fileName}`);
  };

  const handleDocumentUpload = (staffId, documentId, e) => {
    if (e.target.files[0]) {
      const updatedStaffList = staffList.map(staff => {
        if (staff.id === staffId) {
          return {
            ...staff,
            documents: {
              ...staff.documents,
              [documentId]: {
                status: 'obtained',
                file: e.target.files[0].name
              }
            }
          };
        }
        return staff;
      });
      
      setStaffList(updatedStaffList);
      
      // Si el miembro del personal está seleccionado, actualizar también selectedStaff
      if (selectedStaff && selectedStaff.id === staffId) {
        setSelectedStaff(updatedStaffList.find(staff => staff.id === staffId));
      }
      
      alert(`Documento ${documentId} actualizado para ID ${staffId}`);
    }
  };

  // Esta es la función corregida para actualizar los datos de personal
  const handleUpdateStaffData = (staffId, field, value) => {
    // Crear una copia profunda de la lista de personal
    const updatedStaffList = staffList.map(staff => {
      if (staff.id === staffId) {
        // Si encontramos el miembro del personal correcto, actualizamos el campo específico
        return {
          ...staff,
          [field]: value
        };
      }
      return staff;
    });
    
    // Actualizar el estado con la nueva lista
    setStaffList(updatedStaffList);
    
    // Si el miembro del personal está seleccionado, actualizar también selectedStaff
    if (selectedStaff && selectedStaff.id === staffId) {
      setSelectedStaff({
        ...selectedStaff,
        [field]: value
      });
    }
    
    // Opcional: Para depuración
    console.log(`Actualizando: ID ${staffId}, Campo ${field}, Valor ${value}`);
  };

  // Renderizado de la pantalla de carga
  if (isLoading) {
    return (
      <div className="staff-edit-loading">
        <div className="loading-container">
          <div className="loading-hologram">
            <div className="hologram-ring"></div>
            <div className="hologram-circle"></div>
            <div className="hologram-bars">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
          
          <div className="loading-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
          
          <div className="loading-text">{loadingMessage}</div>
          <div className="loading-status">TherapySync Pro <span className="status-dot"></span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="staff-edit-container">
      {/* Cabecera */}
      <div className="staff-edit-header">
        <div className="header-left">
          <button className="back-button" onClick={onBackToOptions}>
            <i className="fas fa-arrow-left"></i>
            <span>Volver</span>
          </button>
          <div className="header-title">
            <h2>Editar Personal</h2>
            <p>Actualice información, gestione documentos y configure permisos de usuario</p>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="refresh-btn" onClick={() => {
            setIsLoading(true);
            setLoadingMessage('Actualizando datos...');
            setTimeout(() => {
              fetchStaffData();
              setIsLoading(false);
            }, 2000);
          }}>
            <i className="fas fa-sync-alt"></i> Actualizar
          </button>
          <button className="export-btn">
            <i className="fas fa-file-export"></i> Exportar
          </button>
        </div>
      </div>
      
      {/* Métricas de resumen */}
      <div className="staff-metrics">
        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="metric-data">
            <h3>{metrics.total}</h3>
            <p>Total personal</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="metric-data">
            <h3>{metrics.active}</h3>
            <p>Activos</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-file-medical"></i>
          </div>
          <div className="metric-data">
            <h3>{metrics.documentsCompletePercentage}%</h3>
            <p>Documentación completa</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <div className="metric-data">
            <h3>{staffList.reduce((sum, staff) => sum + staff.patients, 0)}</h3>
            <p>Pacientes asignados</p>
          </div>
        </div>
      </div>
      
      {/* Barra de filtros y búsqueda */}
      <div className="staff-filters">
        <div className="search-filter">
          <div className="search-input">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Buscar por nombre, email o teléfono..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          
          <div className="filter-by-role">
            <select 
              value={filterRole} 
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">Todos los roles</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="view-options">
          <div className="sort-by">
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="name-asc">Nombre (A-Z)</option>
              <option value="name-desc">Nombre (Z-A)</option>
              <option value="role">Rol</option>
              <option value="patients-desc">Pacientes (Mayor a Menor)</option>
            </select>
          </div>
          
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} 
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th-large"></i>
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} 
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Lista de personal */}
      <div className={`staff-list ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
        {filteredStaff.length > 0 ? (
          <>
            {filteredStaff.map(staff => (
              <div 
                key={staff.id} 
                className={`staff-card ${staff.status}`}
                onClick={() => handleOpenProfile(staff)}
              >
                <div className="card-header">
                  <div className="avatar">
                    {staff.avatar ? (
                      <img src={staff.avatar} alt={`${staff.firstName} ${staff.lastName}`} />
                    ) : (
                      <div className="avatar-placeholder">
                        {staff.firstName.charAt(0)}{staff.lastName.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  <div className="staff-info">
                    <h3>{staff.firstName} {staff.lastName}</h3>
                    <span className="role-badge">{staff.roleDisplay}</span>
                    <span className={`status-badge ${staff.status}`}>
                      {staff.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
                
                <div className="card-content">
                  <div className="contact-info">
                    <div className="info-item">
                      <i className="fas fa-envelope"></i>
                      <span>{staff.email}</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-phone"></i>
                      <span>{staff.phone}</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-birthday-cake"></i>
                      <span>{staff.age} años</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{staff.address}</span>
                    </div>
                  </div>
                  
                  <div className="documents-status">
                    <div className="doc-progress">
                      <div className="progress-label">
                        <span>Documentos</span>
                        <span>
                          {Object.values(staff.documents).filter(doc => doc.status === 'obtained').length}/
                          {Object.values(staff.documents).length}
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{
                            width: `${(Object.values(staff.documents).filter(doc => doc.status === 'obtained').length / 
                              Object.values(staff.documents).length) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card-footer">
                  <div className="patients-info">
                    <i className="fas fa-user-injured"></i>
                    <span>{staff.patients} pacientes asignados</span>
                  </div>
                  
                  <div className="card-actions">
                    <button 
                      className="edit-staff-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProfile(staff);
                      }}
                    >
                      <i className="fas fa-user-edit"></i>
                      <span>Editar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>No se encontraron resultados</h3>
            <p>Intente con diferentes términos de búsqueda o filtros</p>
            <button className="reset-filters" onClick={() => {
              setSearchTerm('');
              setFilterRole('all');
            }}>
              <i className="fas fa-redo"></i> Restablecer filtros
            </button>
          </div>
        )}
      </div>
      
      {/* Modal de Edición de Perfil */}
      {showProfileModal && selectedStaff && (
        <div className="staff-profile-modal-overlay">
          <div className="staff-profile-modal">
            <div className="modal-header">
              <div className="header-left">
                <div className="avatar-container">
                  {selectedStaff.avatar ? (
                    <img src={selectedStaff.avatar} alt={`${selectedStaff.firstName} ${selectedStaff.lastName}`} className="avatar" />
                  ) : (
                    <div className="avatar-placeholder">
                      {selectedStaff.firstName.charAt(0)}{selectedStaff.lastName.charAt(0)}
                    </div>
                  )}
                  <div className={`status-indicator ${selectedStaff.status}`}></div>
                </div>
                
                <div className="profile-title">
                  <div className="edit-name-container">
                    <input
                      type="text"
                      name="firstName"
                      value={selectedStaff.firstName}
                      onChange={(e) => handleUpdateStaffData(selectedStaff.id, 'firstName', e.target.value)}
                      className="edit-name-input"
                      placeholder="Nombre"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={selectedStaff.lastName}
                      onChange={(e) => handleUpdateStaffData(selectedStaff.id, 'lastName', e.target.value)}
                      className="edit-name-input"
                      placeholder="Apellido"
                    />
                  </div>
                  
                  <div className="profile-subtitle">
                    <select
                      name="role"
                      value={selectedStaff.role}
                      onChange={(e) => handleUpdateStaffData(selectedStaff.id, 'role', e.target.value)}
                      className="edit-role-select"
                    >
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                    
                    <select
                      name="status"
                      value={selectedStaff.status}
                      onChange={(e) => handleUpdateStaffData(selectedStaff.id, 'status', e.target.value)}
                      className="edit-status-select"
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="header-actions">
                <button className="cancel-edit-btn" onClick={handleCloseProfile}>
                  <i className="fas fa-times"></i>
                  <span>Cancelar</span>
                </button>
                <button className="save-profile-btn" onClick={() => handleSaveProfile(selectedStaff)}>
                  <i className="fas fa-save"></i>
                  <span>Guardar Cambios</span>
                </button>
                <button className="close-modal-btn" onClick={handleCloseProfile}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            
            {/* Tabs para navegación */}
            <div className="profile-tabs">
              <button 
                className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => handleChangeTab('info')}
              >
                <i className="fas fa-user-circle"></i>
                <span>Información Personal</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
                onClick={() => handleChangeTab('documents')}
              >
                <i className="fas fa-file-medical"></i>
                <span>Documentos</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => handleChangeTab('security')}
              >
                <i className="fas fa-lock"></i>
                <span>Seguridad</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'patients' ? 'active' : ''}`}
                onClick={() => handleChangeTab('patients')}
              >
                <i className="fas fa-user-injured"></i>
                <span>Pacientes Asignados</span>
              </button>
            </div>
            
            {/* Contenido de pestañas */}
            <div className="tab-content">
              {/* Pestaña de información personal */}
              {activeTab === 'info' && (
                <div className="info-tab-content">
                  <div className="info-section">
                    <h3 className="section-title">
                      <i className="fas fa-address-card"></i>
                      Información de Contacto
                    </h3>
                    
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Email</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={selectedStaff.email} 
                          onChange={(e) => handleUpdateStaffData(selectedStaff.id, 'email', e.target.value)} 
                          className="edit-input"
                        />
                      </div>
                      
                      <div className="info-item">
                        <label>Teléfono</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={selectedStaff.phone} 
                          onChange={(e) => handleUpdateStaffData(selectedStaff.id, 'phone', e.target.value)} 
                          className="edit-input"
                        />
                      </div>
                      
                      <div className="info-item">
                        <label>Edad</label>
                        <input 
                          type="number" 
                          name="age" 
                          value={selectedStaff.age} 
                          onChange={(e) => handleUpdateStaffData(selectedStaff.id, 'age', parseInt(e.target.value) || 0)} 
                          className="edit-input"
                          min="0"
                          max="120"
                        />
                      </div>
                      
                      <div className="info-item full-width">
                        <label>Dirección</label>
                        <input 
                          type="text" 
                          name="address" 
                          value={selectedStaff.address} 
                          onChange={(e) => handleUpdateStaffData(selectedStaff.id, 'address', e.target.value)} 
                          className="edit-input"
                        />
                      </div>
                      
                      <div className="info-item">
                        <label>Código Postal</label>
                        <input 
                          type="text" 
                          name="zipCode" 
                          value={selectedStaff.zipCode} 
                          onChange={(e) => handleUpdateStaffData(selectedStaff.id, 'zipCode', e.target.value)} 
                          className="edit-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Pestaña de documentos */}
              {activeTab === 'documents' && (
                <div className="documents-tab-content">
                  <div className="documents-header">
                    <h3 className="section-title">
                      <i className="fas fa-file-medical"></i>
                      Documentos Requeridos
                    </h3>
                    
                    <div className="documents-summary">
                      <div className="progress-container">
                        <div className="progress-info">
                          <span>Estado de documentación</span>
                          <span>
                            {Object.values(selectedStaff.documents).filter(doc => doc.status === 'obtained').length}/
                            {Object.values(selectedStaff.documents).length}
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{
                              width: `${(Object.values(selectedStaff.documents).filter(doc => doc.status === 'obtained').length / 
                                Object.values(selectedStaff.documents).length) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="documents-grid">
                    {documentsList.map(doc => (
                      <div 
                        key={doc.id} 
                        className={`document-card ${selectedStaff.documents[doc.id].status} editable`}
                        onClick={() => handleDocumentStatusToggle(selectedStaff.id, doc.id)}
                      >
                        <div className="document-header">
                          <span className="document-icon">
                            <i className="fas fa-file-alt"></i>
                          </span>
                          <span className="document-name">{doc.name}</span>
                          <span className={`document-status ${selectedStaff.documents[doc.id].status}`}>
                            {selectedStaff.documents[doc.id].status === 'obtained' ? (
                              <><i className="fas fa-check-circle"></i> Obtenido</>
                            ) : (
                              <><i className="fas fa-clock"></i> Pendiente</>
                            )}
                          </span>
                        </div>
                        
                        {doc.description && (
                          <div className="document-description">{doc.description}</div>
                        )}
                        
                        <div className="document-actions">
                          {selectedStaff.documents[doc.id].file ? (
                            <div className="file-info">
                              <i className="fas fa-paperclip"></i>
                              <span className="file-name">{selectedStaff.documents[doc.id].file}</span>
                              <button 
                                className="view-file-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDocumentViewClick(doc.name, selectedStaff.documents[doc.id].file);
                                }}
                              >
                                <i className="fas fa-eye"></i> Ver
                              </button>
                              <label htmlFor={`file-${selectedStaff.id}-${doc.id}`} className="upload-new-btn">
                                <i className="fas fa-sync-alt"></i> Actualizar
                                <input
                                  type="file"
                                  id={`file-${selectedStaff.id}-${doc.id}`}
                                  onChange={(e) => handleDocumentUpload(selectedStaff.id, doc.id, e)}
                                  className="file-input"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </label>
                            </div>
                          ) : (
                            <div className="no-file-info">
                              <i className="fas fa-exclamation-circle"></i>
                              <span>Sin archivo</span>
                              <div className="file-upload">
                                <label htmlFor={`file-${selectedStaff.id}-${doc.id}`} className="upload-btn">
                                  <i className="fas fa-upload"></i> Subir archivo
                                </label>
                                <input
                                  type="file"
                                  id={`file-${selectedStaff.id}-${doc.id}`}
                                  onChange={(e) => handleDocumentUpload(selectedStaff.id, doc.id, e)}
                                  className="file-input"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Pestaña de seguridad */}
              {activeTab === 'security' && (
                <div className="security-tab-content">
                  <div className="security-section">
                    <h3 className="section-title">
                      <i className="fas fa-user-lock"></i>
                      Información de Usuario
                    </h3>
                    
                    <div className="security-form">
                      <div className="form-group">
                        <label>Nombre de Usuario</label>
                        <div className="input-with-action">
                          <input 
                            type="text" 
                            name="userName" 
                            value={selectedStaff.userName} 
                            onChange={(e) => handleUpdateStaffData(selectedStaff.id, 'userName', e.target.value)} 
                            className="security-input"
                          />
                          <button className="copy-btn" onClick={() => {
                            navigator.clipboard.writeText(selectedStaff.userName);
                            alert('Nombre de usuario copiado al portapapeles');
                          }}>
                            <i className="fas fa-copy"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label>Contraseña</label>
                        <div className="input-with-action">
                          <input 
                            type="password" 
                            name="password" 
                            value={selectedStaff.password} 
                            readOnly
                            className="security-input"
                          />
                          <button 
                            className="reset-password-btn" 
                            onClick={() => handleResetPassword(selectedStaff.id)}
                          >
                            <i className="fas fa-key"></i> Restablecer
                          </button>
                        </div>
                        <p className="help-text">
                          Al restablecer la contraseña, se enviará un correo electrónico al usuario con instrucciones para crear una nueva.
                        </p>
                      </div>
                      
                      <div className="form-group">
                        <label>Último inicio de sesión</label>
                        <p className="login-info">10/02/2025 09:45:21 AM</p>
                      </div>
                      
                      <div className="form-group">
                        <label>Dispositivos activos</label>
                        <div className="devices-list">
                          <div className="device-item">
                            <div className="device-info">
                              <i className="fas fa-laptop"></i>
                              <div className="device-details">
                                <p className="device-name">Windows PC - Chrome</p>
                                <p className="device-location">Los Angeles, CA - 192.168.1.45</p>
                              </div>
                            </div>
                            <button className="logout-device-btn">
                              <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                            </button>
                          </div>
                          <div className="device-item">
                            <div className="device-info">
                              <i className="fas fa-mobile-alt"></i>
                              <div className="device-details">
                                <p className="device-name">iPhone 15 - Safari</p>
                                <p className="device-location">Long Beach, CA - 10.0.0.123</p>
                              </div>
                            </div>
                            <button className="logout-device-btn">
                              <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="permissions-section">
                    <h3 className="section-title">
                      <i className="fas fa-shield-alt"></i>
                      Permisos y Acceso
                    </h3>
                    
                    <div className="permissions-grid">
                      <div className="permission-group">
                        <h4>Acceso a Pacientes</h4>
                        <div className="permission-toggle">
                          <input type="checkbox" id="view-patients" className="toggle-input" defaultChecked />
                          <label htmlFor="view-patients" className="toggle-label">Ver pacientes</label>
                        </div>
                        <div className="permission-toggle">
                          <input type="checkbox" id="edit-patients" className="toggle-input" defaultChecked />
                          <label htmlFor="edit-patients" className="toggle-label">Editar pacientes</label>
                        </div>
                        <div className="permission-toggle">
                          <input type="checkbox" id="delete-patients" className="toggle-input" />
                          <label htmlFor="delete-patients" className="toggle-label">Eliminar pacientes</label>
                        </div>
                      </div>
                      
                      <div className="permission-group">
                        <h4>Acceso a Terapeutas</h4>
                        <div className="permission-toggle">
                          <input type="checkbox" id="view-staff" className="toggle-input" defaultChecked />
                          <label htmlFor="view-staff" className="toggle-label">Ver terapeutas</label>
                        </div>
                        <div className="permission-toggle">
                          <input type="checkbox" id="edit-staff" className="toggle-input" />
                          <label htmlFor="edit-staff" className="toggle-label">Editar terapeutas</label>
                        </div>
                        <div className="permission-toggle">
                          <input type="checkbox" id="delete-staff" className="toggle-input" />
                          <label htmlFor="delete-staff" className="toggle-label">Eliminar terapeutas</label>
                        </div>
                      </div>
                      
                      <div className="permission-group">
                        <h4>Acceso a Facturación</h4>
                        <div className="permission-toggle">
                          <input type="checkbox" id="view-billing" className="toggle-input" defaultChecked />
                          <label htmlFor="view-billing" className="toggle-label">Ver facturación</label>
                        </div>
                        <div className="permission-toggle">
                          <input type="checkbox" id="create-invoices" className="toggle-input" />
                          <label htmlFor="create-invoices" className="toggle-label">Crear facturas</label>
                        </div>
                        <div className="permission-toggle">
                          <input type="checkbox" id="process-payments" className="toggle-input" />
                          <label htmlFor="process-payments" className="toggle-label">Procesar pagos</label>
                        </div>
                      </div>
                      
                      <div className="permission-group">
                        <h4>Acceso a Informes</h4>
                        <div className="permission-toggle">
                          <input type="checkbox" id="view-reports" className="toggle-input" defaultChecked />
                          <label htmlFor="view-reports" className="toggle-label">Ver informes</label>
                        </div>
                        <div className="permission-toggle">
                          <input type="checkbox" id="export-reports" className="toggle-input" defaultChecked />
                          <label htmlFor="export-reports" className="toggle-label">Exportar informes</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Pestaña de pacientes asignados */}
              {activeTab === 'patients' && (
                <div className="patients-tab-content">
                  <div className="patients-header">
                    <h3 className="section-title">
                      <i className="fas fa-user-injured"></i>
                      Pacientes Asignados
                    </h3>
                    <span className="patients-count">{selectedStaff.patients} pacientes</span>
                  </div>
                  
                  {selectedStaff.patients > 0 ? (
                    <div className="patients-list">
                      <div className="patient-item">
                        <div className="patient-info">
                          <div className="patient-name">
                            <span className="patient-id">#1024</span>
                            <span>Maria Rodriguez</span>
                          </div>
                          <span className="patient-status active">Activo</span>
                        </div>
                        <div className="patient-details">
                          <div className="patient-detail">
                            <i className="fas fa-calendar-alt"></i>
                            <span>Próxima visita: 12/03/2025</span>
                          </div>
                          <div className="patient-detail">
                            <i className="fas fa-clock"></i>
                            <span>2:30 PM - 3:30 PM</span>
                          </div>
                          <div className="patient-detail">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Domicilio</span>
                          </div>
                        </div>
                        <div className="patient-actions">
                          <button className="patient-action-btn view">
                            <i className="fas fa-eye"></i> Ver
                          </button>
                          <button className="patient-action-btn reassign">
                            <i className="fas fa-exchange-alt"></i> Reasignar
                          </button>
                        </div>
                      </div>
                      
                      <div className="patient-item">
                        <div className="patient-info">
                          <div className="patient-name">
                            <span className="patient-id">#1052</span>
                            <span>John Smith</span>
                          </div>
                          <span className="patient-status active">Activo</span>
                        </div>
                        <div className="patient-details">
                          <div className="patient-detail">
                            <i className="fas fa-calendar-alt"></i>
                            <span>Próxima visita: 15/03/2025</span>
                          </div>
                          <div className="patient-detail">
                            <i className="fas fa-clock"></i>
                            <span>10:00 AM - 11:00 AM</span>
                          </div>
                          <div className="patient-detail">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Clínica</span>
                          </div>
                        </div>
                        <div className="patient-actions">
                          <button className="patient-action-btn view">
                            <i className="fas fa-eye"></i> Ver
                          </button>
                          <button className="patient-action-btn reassign">
                            <i className="fas fa-exchange-alt"></i> Reasignar
                          </button>
                        </div>
                      </div>
                      
                      <div className="patient-item">
                        <div className="patient-info">
                          <div className="patient-name">
                            <span className="patient-id">#1073</span>
                            <span>Carlos Gomez</span>
                          </div>
                          <span className="patient-status pending">Pendiente</span>
                        </div>
                        <div className="patient-details">
                          <div className="patient-detail">
                            <i className="fas fa-calendar-alt"></i>
                            <span>Próxima visita: 18/03/2025</span>
                          </div>
                          <div className="patient-detail">
                            <i className="fas fa-clock"></i>
                            <span>1:00 PM - 2:00 PM</span>
                          </div>
                          <div className="patient-detail">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Domicilio</span>
                          </div>
                        </div>
                        <div className="patient-actions">
                          <button className="patient-action-btn view">
                            <i className="fas fa-eye"></i> Ver
                          </button>
                          <button className="patient-action-btn reassign">
                            <i className="fas fa-exchange-alt"></i> Reasignar
                          </button>
                        </div>
                      </div>
                      
                      <div className="show-more-container">
                        <button className="show-more-btn">
                          <i className="fas fa-plus-circle"></i> Mostrar más pacientes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="no-patients">
                      <i className="fas fa-user-slash"></i>
                      <h4>Sin pacientes asignados</h4>
                      <p>Este terapeuta no tiene pacientes asignados actualmente</p>
                      {selectedStaff.status === 'active' && (
                        <button className="assign-btn">
                          <i className="fas fa-user-plus"></i> Asignar Pacientes
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseProfile}>Cancelar</button>
              <button className="save-btn" onClick={() => handleSaveProfile(selectedStaff)}>
                <i className="fas fa-save"></i> Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffEditComponent;