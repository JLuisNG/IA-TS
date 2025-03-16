import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/support/SupportHeader.scss';
import logoImg from '../../assets/LogoMHC.jpeg';

const SupportHeader = ({ 
  activeSection, 
  onSectionChange, 
  searchQuery, 
  setSearchQuery, 
  notificationCount 
}) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [headerGlow, setHeaderGlow] = useState(false);
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  
  // Opciones del menú
  const menuOptions = [
    { id: 'dashboard', name: 'Dashboard', icon: 'fa-tachometer-alt' },
    { id: 'tickets', name: 'Tickets', icon: 'fa-ticket-alt' },
    { id: 'knowledge', name: 'Knowledge Base', icon: 'fa-book' },
    { id: 'chat', name: 'Live Chat', icon: 'fa-comments' },
    { id: 'email', name: 'Corporate Email', icon: 'fa-envelope' }
  ];
  
  // Datos de notificaciones simuladas
  const notifications = [
    { id: 1, type: 'ticket', title: 'New ticket assigned', time: '10 min ago', read: false },
    { id: 2, type: 'response', title: 'Customer replied to ticket #1082', time: '43 min ago', read: false },
    { id: 3, type: 'system', title: 'System maintenance tonight', time: '2 hours ago', read: false },
    { id: 4, type: 'mention', title: 'You were mentioned in ticket #987', time: '5 hours ago', read: true },
    { id: 5, type: 'overdue', title: 'Ticket #765 is overdue', time: 'Yesterday', read: true }
  ];
  
  // Efecto para activar el brillo del header al estar en la parte superior
  useEffect(() => {
    const handleScroll = () => {
      setHeaderGlow(window.scrollY < 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Invocar inmediatamente para configurar estado inicial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Cerrar menú de usuario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Manejar el cierre de sesión
  const handleLogout = () => {
    setShowUserMenu(false);
    navigate('/');
  };
  
  // Manejar navegación al home
  const handleHomeClick = () => {
    navigate('/homepage');
  };
  
  // Renderizar icono según tipo de notificación
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'ticket': return 'fa-ticket-alt';
      case 'response': return 'fa-reply';
      case 'system': return 'fa-server';
      case 'mention': return 'fa-at';
      case 'overdue': return 'fa-exclamation-circle';
      default: return 'fa-bell';
    }
  };
  
  // Renderizar color según tipo de notificación
  const getNotificationColor = (type) => {
    switch (type) {
      case 'ticket': return '#4CAF50';
      case 'response': return '#2196F3';
      case 'system': return '#FF9800';
      case 'mention': return '#9C27B0';
      case 'overdue': return '#F44336';
      default: return '#607D8B';
    }
  };
  
  return (
    <header className={`support-header ${headerGlow ? 'glow-effect' : ''}`}>
      <div className="support-header-container">
        {/* Logo */}
        <div className="support-logo-container" onClick={handleHomeClick}>
          <div className="support-logo-glow"></div>
          <img src={logoImg} alt="TherapySync Logo" className="support-logo" />
          <span className="support-logo-text">Support <span>Center</span></span>
        </div>
        
        {/* Navegación */}
        <nav className="support-navigation">
          {menuOptions.map((option) => (
            <div 
              key={option.id}
              className={`support-nav-item ${activeSection === option.id ? 'active' : ''}`}
              onClick={() => onSectionChange(option.id)}
            >
              <i className={`fas ${option.icon}`}></i>
              <span>{option.name}</span>
              {activeSection === option.id && (
                <div className="active-indicator"></div>
              )}
            </div>
          ))}
        </nav>
        
        {/* Barra de búsqueda y herramientas */}
        <div className="support-tools">
          {/* Búsqueda */}
          <div className="support-search">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search help articles, tickets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          
          {/* Notificaciones */}
          <div className="support-notifications" ref={notificationsRef}>
            <button 
              className={`notifications-button ${showNotifications ? 'active' : ''}`}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="fas fa-bell"></i>
              {notificationCount > 0 && (
                <span className="notifications-badge">{notificationCount}</span>
              )}
            </button>
            
            {/* Panel de notificaciones */}
            {showNotifications && (
              <div className="notifications-panel">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                  <button className="mark-all-read">
                    <i className="fas fa-check-double"></i>
                    <span>Mark all as read</span>
                  </button>
                </div>
                
                <div className="notifications-list">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    >
                      <div 
                        className="notification-icon" 
                        style={{ backgroundColor: getNotificationColor(notification.type) }}
                      >
                        <i className={`fas ${getNotificationIcon(notification.type)}`}></i>
                      </div>
                      <div className="notification-content">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-time">{notification.time}</div>
                      </div>
                      <button className="notification-action">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="notifications-footer">
                  <button className="view-all">View all notifications</button>
                </div>
              </div>
            )}
          </div>
          
          {/* Perfil de usuario */}
          <div className="support-user-profile" ref={userMenuRef}>
            <div 
              className={`support-profile-button ${showUserMenu ? 'active' : ''}`} 
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="support-profile-info">
                <span className="support-user-name">Luis Nava</span>
                <span className="support-user-role">Admin</span>
              </div>
              
              <div className="support-avatar">
                <div className="support-avatar-text">LN</div>
                <div className="support-avatar-ring"></div>
              </div>
              
              <i className={`fas fa-chevron-${showUserMenu ? 'up' : 'down'}`}></i>
            </div>
            
            {/* Menú desplegable del usuario */}
            {showUserMenu && (
              <div className="support-user-menu">
                <div className="support-menu-header">
                  <div className="support-user-info">
                    <div className="support-user-avatar">
                      <span>LN</span>
                    </div>
                    <div className="support-user-details">
                      <h4>Luis Nava</h4>
                      <span className="support-user-email">luis.nava@example.com</span>
                    </div>
                  </div>
                </div>
                
                <div className="support-menu-items">
                  <div className="support-menu-item">
                    <i className="fas fa-user-circle"></i>
                    <span>My Account</span>
                  </div>
                  <div className="support-menu-item">
                    <i className="fas fa-cog"></i>
                    <span>Settings</span>
                  </div>
                  <div className="support-menu-item">
                    <i className="fas fa-bell"></i>
                    <span>Notifications</span>
                    <div className="support-notification-badge">{notificationCount}</div>
                  </div>
                </div>
                
                <div className="support-menu-divider"></div>
                
                <div className="support-menu-item logout" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Log Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SupportHeader;