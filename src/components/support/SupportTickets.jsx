import React, { useState, useEffect } from 'react';
import '../../styles/support/SupportTickets.scss';

const SupportTickets = ({ preview = false }) => {
  const [tickets, setTickets] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Datos simulados de tickets
  const mockTickets = [
    {
      id: 'TK-1094',
      subject: 'Unable to access patient records after recent update',
      status: 'open',
      priority: 'high',
      customer: 'Jennifer Wilson',
      avatar: 'JW',
      customerEmail: 'jennifer.w@healthcare.org',
      date: '2023-03-14 09:32',
      lastUpdate: '2h ago',
      department: 'Technical',
      responses: 3,
      assigned: 'Luis Nava',
      tags: ['bug', 'access', 'patient records'],
      messages: [
        {
          id: 1,
          sender: 'Jennifer Wilson',
          avatar: 'JW',
          role: 'client',
          time: '09:32 AM',
          content: 'After updating to the latest version of TherapySync, I am unable to access patient records. The system shows an error message stating "Unauthorized access" even though I have the proper credentials. This is urgent as I need to review patient information for upcoming appointments.',
          attachments: [
            { name: 'error_screenshot.png', size: '356 KB', type: 'image' }
          ]
        },
        {
          id: 2,
          sender: 'Support Team',
          avatar: 'ST',
          role: 'support',
          time: '10:15 AM',
          content: 'Hello Jennifer, thank you for reporting this issue. We are sorry for the inconvenience. Could you please provide your username and the exact error message you are seeing? Also, could you let us know which browser and device you are using? This will help us troubleshoot the problem more effectively.',
          attachments: []
        },
        {
          id: 3,
          sender: 'Jennifer Wilson',
          avatar: 'JW',
          role: 'client',
          time: '10:47 AM',
          content: 'My username is jwilson2023. The exact error is: "Error 403: Unauthorized access to patient database". I am using Chrome on a Windows 11 laptop. I have tried clearing cache and cookies, but the issue persists.',
          attachments: [
            { name: 'detailed_error.png', size: '512 KB', type: 'image' }
          ]
        },
        {
          id: 4,
          sender: 'Luis Nava',
          avatar: 'LN',
          role: 'agent',
          time: '11:30 AM',
          content: 'Hello Jennifer, this is Luis taking over your case. I have checked your account permissions and found that during the update, your access level was reset. I have restored the proper authorization level for your account. Could you please try logging out and logging back in? The issue should be resolved now. If you continue experiencing problems, please let us know immediately.',
          attachments: []
        }
      ]
    },
    {
      id: 'TK-1093',
      subject: 'Calendar sync issue with external scheduling system',
      status: 'in-progress',
      priority: 'medium',
      customer: 'Robert Chen',
      avatar: 'RC',
      customerEmail: 'r.chen@cityhealth.com',
      date: '2023-03-13 16:45',
      lastUpdate: '1d ago',
      department: 'Integration',
      responses: 2,
      assigned: 'Luis Nava',
      tags: ['integration', 'calendar', 'sync'],
      messages: []
    },
    {
      id: 'TK-1092',
      subject: 'Payment processing failure for monthly subscription',
      status: 'pending',
      priority: 'medium',
      customer: 'Sarah Martinez',
      avatar: 'SM',
      customerEmail: 's.martinez@therapycenter.net',
      date: '2023-03-13 14:20',
      lastUpdate: '1d ago',
      department: 'Billing',
      responses: 2,
      assigned: 'Luis Nava',
      tags: ['billing', 'payment', 'subscription'],
      messages: []
    },
    {
      id: 'TK-1091',
      subject: 'Feature request: Add bulk patient import option',
      status: 'open',
      priority: 'low',
      customer: 'Michael Thompson',
      avatar: 'MT',
      customerEmail: 'm.thompson@wellness.org',
      date: '2023-03-12 11:05',
      lastUpdate: '3d ago',
      department: 'Product',
      responses: 1,
      assigned: 'Unassigned',
      tags: ['feature request', 'patient management', 'import'],
      messages: []
    },
    {
      id: 'TK-1090',
      subject: 'Export data in CSV format not working',
      status: 'resolved',
      priority: 'high',
      customer: 'Emma Davis',
      avatar: 'ED',
      customerEmail: 'e.davis@healthgroup.com',
      date: '2023-03-10 08:15',
      lastUpdate: '4d ago',
      department: 'Technical',
      responses: 5,
      assigned: 'Luis Nava',
      tags: ['export', 'data', 'csv'],
      messages: []
    },
    {
      id: 'TK-1089',
      subject: 'Confusion about new billing system',
      status: 'closed',
      priority: 'medium',
      customer: 'David Wilson',
      avatar: 'DW',
      customerEmail: 'david.w@medicalcenter.org',
      date: '2023-03-09 15:30',
      lastUpdate: '5d ago',
      department: 'Billing',
      responses: 4,
      assigned: 'Luis Nava',
      tags: ['billing', 'question', 'training'],
      messages: []
    }
  ];
  
  // Cargar tickets simulados
  useEffect(() => {
    setTimeout(() => {
      setTickets(mockTickets);
      setLoading(false);
      
      // Si estamos en modo preview, seleccionar el primer ticket por defecto
      if (preview && mockTickets.length > 0) {
        setSelectedTicket(mockTickets[0]);
      }
    }, 800);
  }, [preview]);
  
  // Cambiar el filtro de tickets
  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };
  
  // Filtrar tickets según el filtro actual
  const getFilteredTickets = () => {
    if (currentFilter === 'all') return tickets;
    if (currentFilter === 'my-tickets') return tickets.filter(ticket => ticket.assigned === 'Luis Nava');
    if (currentFilter === 'high-priority') return tickets.filter(ticket => ticket.priority === 'high');
    if (currentFilter === 'unassigned') return tickets.filter(ticket => ticket.assigned === 'Unassigned');
    if (currentFilter === 'resolved') return tickets.filter(ticket => ticket.status === 'resolved' || ticket.status === 'closed');
    return tickets;
  };
  
  // Seleccionar un ticket
  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    if (preview) {
      setIsExpanded(true);
    }
  };
  
  // Obtener color según la prioridad
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };
  
  // Obtener color según el estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#2196F3';
      case 'in-progress': return '#9C27B0';
      case 'pending': return '#FF9800';
      case 'resolved': return '#4CAF50';
      case 'closed': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };
  
  // Renderizar etiqueta de estado
  const renderStatusBadge = (status) => {
    const color = getStatusColor(status);
    const label = status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    return (
      <div className="ticket-status-badge" style={{ backgroundColor: color }}>
        {label}
      </div>
    );
  };
  
  // Renderizar detalles del ticket seleccionado
  const renderTicketDetails = () => {
    if (!selectedTicket) {
      return (
        <div className="ticket-details-empty">
          <div className="empty-icon">
            <i className="fas fa-ticket-alt"></i>
          </div>
          <h3>No Ticket Selected</h3>
          <p>Select a ticket from the list to view details</p>
        </div>
      );
    }
    
    return (
      <div className="ticket-details-content">
        <div className="ticket-details-header">
          <div className="ticket-details-id">{selectedTicket.id}</div>
          <h2 className="ticket-details-subject">{selectedTicket.subject}</h2>
          <div className="ticket-details-meta">
            <div className="ticket-meta-item">
              <i className="fas fa-calendar-alt"></i>
              <span>Created: {selectedTicket.date}</span>
            </div>
            <div className="ticket-meta-item">
              <i className="fas fa-clock"></i>
              <span>Last update: {selectedTicket.lastUpdate}</span>
            </div>
            <div className="ticket-meta-item">
              <i className="fas fa-tags"></i>
              <div className="ticket-tags">
                {selectedTicket.tags.map((tag, index) => (
                  <span key={index} className="ticket-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="ticket-details-actions">
            <button className="ticket-action-button primary">
              <i className="fas fa-reply"></i>
              <span>Reply</span>
            </button>
            <button className="ticket-action-button">
              <i className="fas fa-user-plus"></i>
              <span>Assign</span>
            </button>
            <button className="ticket-action-button">
              <i className="fas fa-tag"></i>
              <span>Change Status</span>
            </button>
            <button className="ticket-action-button secondary">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
        
        <div className="ticket-customer-info">
          <div className="customer-avatar">
            <span>{selectedTicket.avatar}</span>
          </div>
          <div className="customer-details">
            <div className="customer-name">{selectedTicket.customer}</div>
            <div className="customer-email">{selectedTicket.customerEmail}</div>
          </div>
          <div className="customer-actions">
            <button className="customer-action-button">
              <i className="fas fa-user"></i>
              <span>View Profile</span>
            </button>
          </div>
        </div>
        
        <div className="ticket-conversation">
          {selectedTicket.messages && selectedTicket.messages.length > 0 ? (
            selectedTicket.messages.map((message) => (
              <div key={message.id} className={`conversation-message ${message.role}`}>
                <div className="message-avatar">
                  <span>{message.avatar}</span>
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-sender">{message.sender}</span>
                    <span className="message-time">{message.time}</span>
                  </div>
                  <div className="message-text">{message.content}</div>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="message-attachments">
                      {message.attachments.map((attachment, idx) => (
                        <div key={idx} className="message-attachment">
                          <i className={`fas fa-${attachment.type === 'image' ? 'image' : 'file'}`}></i>
                          <span className="attachment-name">{attachment.name}</span>
                          <span className="attachment-size">{attachment.size}</span>
                          <button className="attachment-download">
                            <i className="fas fa-download"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
<div className="no-messages">
              <p>No conversation history available for this ticket.</p>
            </div>
          )}
        </div>
        
        <div className="ticket-reply-form">
          <div className="reply-form-header">
            <h4>Add Reply</h4>
            <div className="form-actions">
              <button className="form-action-button">
                <i className="fas fa-paperclip"></i>
                <span>Attach Files</span>
              </button>
              <button className="form-action-button">
                <i className="fas fa-code"></i>
                <span>Insert Code</span>
              </button>
              <button className="form-action-button">
                <i className="fas fa-image"></i>
                <span>Insert Image</span>
              </button>
            </div>
          </div>
          <div className="reply-form-content">
            <textarea 
              placeholder="Type your reply here..."
              rows="5"
            ></textarea>
          </div>
          <div className="reply-form-footer">
            <div className="reply-options">
              <div className="reply-option">
                <input type="checkbox" id="notification" defaultChecked />
                <label htmlFor="notification">Send notification to customer</label>
              </div>
              <div className="reply-option">
                <input type="checkbox" id="internal-note" />
                <label htmlFor="internal-note">Internal note (not visible to customer)</label>
              </div>
            </div>
            <div className="reply-buttons">
              <button className="reply-button secondary">Save as Draft</button>
              <button className="reply-button primary">Send Reply</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Renderizar el componente principal
  return (
    <div className={`support-tickets ${preview ? 'preview-mode' : ''} ${isExpanded ? 'expanded' : ''}`}>
      {!preview && (
        <div className="tickets-header">
          <h2>Support Tickets</h2>
          <div className="tickets-actions">
            <button className="ticket-action new-ticket">
              <i className="fas fa-plus"></i>
              <span>New Ticket</span>
            </button>
            <button className="ticket-action">
              <i className="fas fa-filter"></i>
              <span>Filter</span>
            </button>
            <button className="ticket-action">
              <i className="fas fa-sort"></i>
              <span>Sort</span>
            </button>
          </div>
        </div>
      )}
      
      <div className="tickets-container">
        {/* Panel de filtros */}
        {!preview && (
          <div className="tickets-filters">
            <div className="filters-header">
              <h3>Filter Tickets</h3>
            </div>
            <div className="filters-list">
              <div 
                className={`filter-item ${currentFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                <i className="fas fa-ticket-alt"></i>
                <span>All Tickets</span>
                <div className="filter-count">{tickets.length}</div>
              </div>
              <div 
                className={`filter-item ${currentFilter === 'my-tickets' ? 'active' : ''}`}
                onClick={() => handleFilterChange('my-tickets')}
              >
                <i className="fas fa-user-check"></i>
                <span>My Tickets</span>
                <div className="filter-count">
                  {tickets.filter(t => t.assigned === 'Luis Nava').length}
                </div>
              </div>
              <div 
                className={`filter-item ${currentFilter === 'high-priority' ? 'active' : ''}`}
                onClick={() => handleFilterChange('high-priority')}
              >
                <i className="fas fa-exclamation-circle"></i>
                <span>High Priority</span>
                <div className="filter-count">
                  {tickets.filter(t => t.priority === 'high').length}
                </div>
              </div>
              <div 
                className={`filter-item ${currentFilter === 'unassigned' ? 'active' : ''}`}
                onClick={() => handleFilterChange('unassigned')}
              >
                <i className="fas fa-user-slash"></i>
                <span>Unassigned</span>
                <div className="filter-count">
                  {tickets.filter(t => t.assigned === 'Unassigned').length}
                </div>
              </div>
              <div 
                className={`filter-item ${currentFilter === 'resolved' ? 'active' : ''}`}
                onClick={() => handleFilterChange('resolved')}
              >
                <i className="fas fa-check-circle"></i>
                <span>Resolved/Closed</span>
                <div className="filter-count">
                  {tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length}
                </div>
              </div>
            </div>
            <div className="filters-section">
              <h4 className="section-title">
                <i className="fas fa-bookmark"></i>
                <span>Departments</span>
              </h4>
              <div className="section-items">
                <div className="section-item">
                  <span>Technical</span>
                  <div className="item-count">
                    {tickets.filter(t => t.department === 'Technical').length}
                  </div>
                </div>
                <div className="section-item">
                  <span>Billing</span>
                  <div className="item-count">
                    {tickets.filter(t => t.department === 'Billing').length}
                  </div>
                </div>
                <div className="section-item">
                  <span>Product</span>
                  <div className="item-count">
                    {tickets.filter(t => t.department === 'Product').length}
                  </div>
                </div>
                <div className="section-item">
                  <span>Integration</span>
                  <div className="item-count">
                    {tickets.filter(t => t.department === 'Integration').length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Lista de tickets */}
        <div className="tickets-list">
          {preview && (
            <div className="preview-header">
              <h3>Recent Tickets</h3>
              <button className="preview-action" onClick={() => setIsExpanded(!isExpanded)}>
                <i className={`fas fa-${isExpanded ? 'compress-alt' : 'expand-alt'}`}></i>
              </button>
            </div>
          )}
          
          {loading ? (
            <div className="tickets-loading">
              <div className="loading-spinner"></div>
              <span>Loading tickets...</span>
            </div>
          ) : getFilteredTickets().length > 0 ? (
            <div className="tickets-list-content">
              {getFilteredTickets().slice(0, preview ? 3 : undefined).map((ticket) => (
                <div 
                  key={ticket.id}
                  className={`ticket-item ${selectedTicket && selectedTicket.id === ticket.id ? 'selected' : ''}`}
                  onClick={() => handleTicketSelect(ticket)}
                >
                  <div className="ticket-priority" style={{ backgroundColor: getPriorityColor(ticket.priority) }}></div>
                  <div className="ticket-main">
                    <div className="ticket-id">{ticket.id}</div>
                    <div className="ticket-subject">{ticket.subject}</div>
                    <div className="ticket-info">
                      <div className="ticket-customer">
                        <span className="customer-avatar">{ticket.avatar}</span>
                        <span className="customer-name">{ticket.customer}</span>
                      </div>
                      <div className="ticket-meta">
                        <span className="ticket-time">
                          <i className="fas fa-clock"></i> {ticket.lastUpdate}
                        </span>
                        <span className="ticket-responses">
                          <i className="fas fa-reply"></i> {ticket.responses}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ticket-status">
                    {renderStatusBadge(ticket.status)}
                    <div className="ticket-assigned">
                      {ticket.assigned === 'Unassigned' ? (
                        <span className="unassigned">
                          <i className="fas fa-user-slash"></i> Unassigned
                        </span>
                      ) : (
                        <span className="assigned">
                          <i className="fas fa-user-check"></i> {ticket.assigned}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {preview && tickets.length > 3 && (
                <div className="view-all-link">
                  <a href="#">
                    <span>View all tickets</span>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="no-tickets">
              <div className="no-data-icon">
                <i className="fas fa-ticket-alt"></i>
              </div>
              <h3>No tickets found</h3>
              <p>There are no tickets matching your current filters</p>
            </div>
          )}
        </div>
        
        {/* Detalles del ticket */}
        <div className="ticket-details">
          {renderTicketDetails()}
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;