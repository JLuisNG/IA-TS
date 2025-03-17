import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/accounting/Accounting.scss';
import AccountingDashboard from './AccountingDashboard.jsx';
import PaymentPeriodSelector from './PaymentPeriodSelector.jsx';
import TherapistFinancialList from './TherapistFinancialList.jsx';
import TherapistPaymentModal from './TherapistPaymentModal.jsx';
import logoImg from '../../assets/LogoMHC.jpeg';

const Accounting = () => {
  const navigate = useNavigate();
  // Estados para gestionar la interfaz y los datos
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuTransitioning, setMenuTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [showTherapistModal, setShowTherapistModal] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  
  // Ref para el menú de usuario
  const userMenuRef = useRef(null);
  
  // Períodos de pago según el esquema proporcionado
  const paymentPeriods = [
    { id: 1, period: "Jan 1 to 15", paymentDate: "Feb 15", status: "paid" },
    { id: 2, period: "Jan 16 to 31", paymentDate: "Feb 28", status: "paid" },
    { id: 3, period: "Feb 1 to 15", paymentDate: "Mar 15", status: "paid" },
    { id: 4, period: "Feb 16 to 28", paymentDate: "Mar 31", status: "paid" },
    { id: 5, period: "Mar 1 to 15", paymentDate: "Apr 15", status: "pending" },
    { id: 6, period: "Mar 16 to 31", paymentDate: "Apr 30", status: "upcoming" },
    { id: 7, period: "Apr 1 to 15", paymentDate: "May 15", status: "upcoming" },
    { id: 8, period: "Apr 16 to 30", paymentDate: "May 31", status: "upcoming" },
  ];

  // Efecto para cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simular carga de datos (reemplazar con llamadas a API reales)
      setTimeout(() => {
        // Set dashboard statistics
        setDashboardStats({
          totalBilled: 127850.75,
          pendingPayments: 42500.25,
          completedPayments: 85350.50,
          averagePerVisit: 85.75,
          visitsByDiscipline: {
            PT: 650,
            OT: 420,
            ST: 310
          },
          revenueByMonth: [
            { month: 'Jan', revenue: 38420.50 },
            { month: 'Feb', revenue: 42850.75 },
            { month: 'Mar', revenue: 46580.25 }
          ]
        });
        
        // Set therapists with mock data
        setTherapists([
          {
            id: 1,
            name: "Regina Araquel",
            role: "PT",
            visits: 45,
            earnings: 4050.75,
            status: "verified",
            pendingVisits: 3,
            completionRate: 97,
            avatar: null,
            patients: [
              { id: 101, name: "Soheila Adhami", visits: 8, revenue: 680.00, lastVisit: "2025-03-14" },
              { id: 102, name: "James Smith", visits: 12, revenue: 1020.00, lastVisit: "2025-03-15" },
              { id: 103, name: "Maria Rodriguez", visits: 10, revenue: 850.00, lastVisit: "2025-03-12" }
            ]
          },
          {
            id: 2,
            name: "Jacob Staffey",
            role: "PTA",
            visits: 38,
            earnings: 3230.00,
            status: "pending",
            pendingVisits: 5,
            completionRate: 92,
            avatar: null,
            patients: [
              { id: 104, name: "Linda Johnson", visits: 10, revenue: 850.00, lastVisit: "2025-03-10" },
              { id: 105, name: "Robert Garcia", visits: 9, revenue: 765.00, lastVisit: "2025-03-13" }
            ]
          },
          {
            id: 3,
            name: "Justin Shimane",
            role: "OT",
            visits: 42,
            earnings: 3780.00,
            status: "verified",
            pendingVisits: 0,
            completionRate: 100,
            avatar: null,
            patients: [
              { id: 106, name: "Susan Wilson", visits: 7, revenue: 595.00, lastVisit: "2025-03-14" },
              { id: 107, name: "Michael Brown", visits: 8, revenue: 680.00, lastVisit: "2025-03-15" }
            ]
          },
          {
            id: 4,
            name: "April Kim",
            role: "COTA",
            visits: 35,
            earnings: 2975.00,
            status: "pending",
            pendingVisits: 2,
            completionRate: 95,
            avatar: null,
            patients: [
              { id: 108, name: "David Anderson", visits: 6, revenue: 510.00, lastVisit: "2025-03-11" },
              { id: 109, name: "Jennifer Lopez", visits: 7, revenue: 595.00, lastVisit: "2025-03-13" }
            ]
          },
          {
            id: 5,
            name: "Elena Martinez",
            role: "ST",
            visits: 40,
            earnings: 3600.00,
            status: "verified",
            pendingVisits: 1,
            completionRate: 98,
            avatar: null,
            patients: [
              { id: 110, name: "Thomas White", visits: 9, revenue: 765.00, lastVisit: "2025-03-12" },
              { id: 111, name: "Jessica Taylor", visits: 8, revenue: 680.00, lastVisit: "2025-03-15" }
            ]
          }
        ]);
        
        // Set default selected period (current or most recent)
        setSelectedPeriod(paymentPeriods[4]); // March 1-15 as default in this example
        
        setIsLoading(false);
        
        // Trigger entrance animations after loading
        setTimeout(() => {
          setAnimateIn(true);
        }, 100);
      }, 1200);
    };
    
    loadData();
    
    // Cleanup
    return () => {
      setAnimateIn(false);
    };
  }, []);
  
  // Efecto para cerrar menú de usuario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manejar cambio de período seleccionado
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    
    // Opcional: aquí podrías cargar datos específicos del período si no están cargados aún
  };
  
  const handleLogout = () => {
    setIsLoggingOut(true);
    setShowUserMenu(false);
    
    // Después de que la animación se complete, redirigir al login
    setTimeout(() => {
      navigate('/');
    }, 5000); // Tiempo ajustado para la animación mejorada
  };
  

  // Manejar clic en terapeuta para mostrar modal
  const handleTherapistClick = (therapist) => {
    setSelectedTherapist(therapist);
    setShowTherapistModal(true);
  };
  
  // Manejar navegación al menú principal
  const handleMainMenuTransition = () => {
    setMenuTransitioning(true);
    
    setTimeout(() => {
      navigate('/homePage');
    }, 300);
  };
  
  // Manejar redirección a página de paciente
  const handlePatientClick = (patientId) => {
    // Ruta según especificación
    navigate(`../pacientes/Patients/infoPatients/${patientId}`);
  };

  return (
    <div className={`accounting-container ${animateIn ? 'animate-in' : ''} ${menuTransitioning ? 'transitioning' : ''}`}>
      {/* Fondo con parallax y gradiente */}
      <div className="parallax-background">
        <div className="gradient-overlay"></div>
        <div className="animated-particles"></div>
      </div>
      
      {/* Header con logo y perfil */}
      <header className="main-header">
        <div className="header-container">
          <div className="logo-container">
            <div className="logo-wrapper">
              <img src={logoImg} alt="TherapySync Logo" className="logo" />
              <div className="logo-glow"></div>
            </div>
            
            {/* Navegación de menú */}
            <div className="menu-navigation">
              <button 
                className="nav-button main-menu" 
                onClick={handleMainMenuTransition}
                title="Back to main menu"
              >
                <i className="fas fa-th-large"></i>
                <span>Main Menu</span>
                <div className="button-effect"></div>
              </button>
              
              <button 
                className="nav-button accounting-menu active" 
                title="Financial Management"
              >
                <i className="fas fa-chart-pie"></i>
                <span>Accounting</span>
                <div className="button-effect"></div>
              </button>
            </div>
          </div>
          
          {/* Perfil de usuario */}
          <div className="user-profile" ref={userMenuRef}>
            <div 
              className={`profile-button ${showUserMenu ? 'active' : ''}`} 
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="profile-info">
                <span className="user-name">Luis Nava</span>
                <span className="user-role">Admin</span>
              </div>
              
              <div className="avatar">
                <div className="avatar-text">LN</div>
                <div className="avatar-ring"></div>
              </div>
              
              <i className={`fas fa-chevron-${showUserMenu ? 'up' : 'down'}`}></i>
            </div>
            
            {/* Menú desplegable del usuario con efectos */}
            {showUserMenu && (
              <div className="user-menu">
                <div className="menu-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      <span>LN</span>
                    </div>
                    <div className="user-details">
                      <h4>Luis Nava</h4>
                      <span className="user-email">luis.nava@example.com</span>
                    </div>
                  </div>
                </div>
                
                <div className="menu-items">
                  <div className="menu-item">
                    <i className="fas fa-user-circle"></i>
                    <span>My Account</span>
                  </div>
                  <div className="menu-item">
                    <i className="fas fa-cog"></i>
                    <span>Settings</span>
                  </div>
                  <div className="menu-item">
                    <i className="fas fa-bell"></i>
                    <span>Notifications</span>
                    <div className="notification-badge">3</div>
                  </div>
                </div>
                
                <div className="menu-divider"></div>
                
                <div className="menu-item logout" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Log Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Contenido principal */}
      <main className="accounting-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading accounting data...</p>
          </div>
        ) : (
          <>
            <div className="accounting-header">
              <div className="title-section">
                <h1>
                  <i className="fas fa-chart-line"></i>
                  Financial Management
                  <div className="title-highlight"></div>
                </h1>
                <p className="subtitle">
                  Track earnings, manage payments, and view financial metrics
                </p>
              </div>
            </div>
            
            <div className="accounting-body">
              {/* Dashboard de métricas */}
              <AccountingDashboard 
                stats={dashboardStats} 
                selectedPeriod={selectedPeriod}
              />
              
              {/* Selector de períodos de pago */}
              <div className="period-section">
                <h2>Payment Periods</h2>
                <PaymentPeriodSelector 
                  periods={paymentPeriods}
                  selectedPeriod={selectedPeriod}
                  onPeriodChange={handlePeriodChange}
                />
              </div>
              
              {/* Lista de terapeutas con datos financieros */}
              <div className="therapists-section">
                <h2>Therapist Earnings</h2>
                <TherapistFinancialList 
                  therapists={therapists}
                  onTherapistClick={handleTherapistClick}
                  selectedPeriod={selectedPeriod}
                />
              </div>
            </div>
          </>
        )}
      </main>
      
      {/* Modal de detalles del terapeuta */}
      {showTherapistModal && selectedTherapist && (
        <TherapistPaymentModal 
          therapist={selectedTherapist}
          period={selectedPeriod}
          onClose={() => setShowTherapistModal(false)}
          onPatientClick={handlePatientClick}
        />
      )}
    </div>
  );
};

export default Accounting;