import React, { useState, useEffect, useRef } from 'react';
import '../../styles/support/SupportChat.scss';

const SupportChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [agentStatus, setAgentStatus] = useState('online');
  const [selectedTab, setSelectedTab] = useState('active');
  const [newMessageAlert, setNewMessageAlert] = useState(false);
  
  const chatContainerRef = useRef(null);
  
  // Datos simulados de conversaciones
  const mockConversations = [
    {
      id: 'chat-001',
      customer: {
        name: 'Emily Johnson',
        avatar: 'EJ',
        email: 'emily.johnson@example.com',
        status: 'online'
      },
      department: 'Technical Support',
      startTime: '2023-03-15 10:15',
      duration: '24m',
      status: 'active',
      unreadCount: 2,
      priority: 'high',
      tags: ['login issue', 'billing'],
      messages: [
        {
          id: 1,
          sender: 'system',
          content: 'Chat started at 10:15 AM',
          time: '10:15 AM',
          isRead: true
        },
        {
          id: 2,
          sender: 'customer',
          content: 'Hello, I´m having trouble logging into my account after the recent update. It keeps saying "invalid credentials" even though Im sure my password is correct.',
          time: '10:15 AM',
          isRead: true
        },
        {
          id: 3,
          sender: 'agent',
          content: 'Hello Emily, I am Luis from technical support. I am sorry to hear you are having trouble logging in. Let me help you with that.',
          time: '10:17 AM',
          isRead: true
        },
        {
          id: 4,
          sender: 'agent',
          content: 'Could you tell me if you have tried resetting your password? Also, which browser are you using?',
          time: '10:18 AM',
          isRead: true
        },
        {
          id: 5,
          sender: 'customer',
          content: 'I tried resetting my password, but I am not receiving the reset email. I am using Chrome on my laptop.',
          time: '10:20 AM',
          isRead: true
        },
        {
          id: 6,
          sender: 'agent',
          content: 'Thank you for that information. Sometimes reset emails can be delayed or go to spam folders. Let me check your account on our end.',
          time: '10:22 AM',
          isRead: true
        },
        {
          id: 7,
          sender: 'agent',
          content: 'I have checked your account and I see that there might be an issue with your email verification. Let me fix that for you.',
          time: '10:25 AM',
          isRead: true
        },
        {
          id: 8,
          sender: 'customer',
          content: 'That would be great, thank you!',
          time: '10:26 AM',
          isRead: true
        },
        {
          id: 9,
          sender: 'agent',
          content: 'I have reset your account verification status. Please try logging in again now. If that does not work, I can generate a temporary password for you.',
          time: '10:32 AM',
          isRead: true
        },
        {
          id: 10,
          sender: 'customer',
          content: 'It is still not working. Could you provide me with a temporary password?',
          time: '10:35 AM',
          isRead: false
        },
        {
          id: 11,
          sender: 'customer',
          content: 'Also, will I need to update my billing information after this is fixed? I noticed my last payment did not go through.',
          time: '10:36 AM',
          isRead: false
        }
      ]
    },
    {
      id: 'chat-002',
      customer: {
        name: 'James Rodriguez',
        avatar: 'JR',
        email: 'j.rodriguez@healthcare.net',
        status: 'online'
      },
      department: 'Product Support',
      startTime: '2023-03-15 09:45',
      duration: '58m',
      status: 'active',
      unreadCount: 0,
      priority: 'medium',
      tags: ['reports', 'data export'],
      messages: []
    },
    {
      id: 'chat-003',
      customer: {
        name: 'Sophia Lee',
        avatar: 'SL',
        email: 'sophia.lee@example.org',
        status: 'online'
      },
      department: 'Billing',
      startTime: '2023-03-15 10:05',
      duration: '37m',
      status: 'active',
      unreadCount: 1,
      priority: 'medium',
      tags: ['subscription', 'payment'],
      messages: []
    },
    {
      id: 'chat-004',
      customer: {
        name: 'Ryan Miller',
        avatar: 'RM',
        email: 'ryan.m@medclinic.com',
        status: 'away'
      },
      department: 'Technical Support',
      startTime: '2023-03-14 15:30',
      duration: '1h 12m',
      status: 'pending',
      unreadCount: 0,
      priority: 'low',
      tags: ['calendar', 'sync'],
      messages: []
    },
    {
      id: 'chat-005',
      customer: {
        name: 'Daniel Wang',
        avatar: 'DW',
        email: 'd.wang@therapy.org',
        status: 'offline'
      },
      department: 'Product Support',
      startTime: '2023-03-14 14:20',
      duration: '45m',
      status: 'closed',
      unreadCount: 0,
      priority: 'medium',
      tags: ['patient records', 'import'],
      messages: []
    }
  ];
  
  // Simular carga de datos
  useEffect(() => {
    setTimeout(() => {
      setConversations(mockConversations);
      setSelectedConversation(mockConversations[0]);
      setLoading(false);
    }, 1000);
    
    // Simular un nuevo mensaje después de cierto tiempo
    const messageTimer = setTimeout(() => {
      if (!selectedConversation) return;
      
      const updatedConversations = [...conversations];
      const conversationIndex = updatedConversations.findIndex(c => c.id === 'chat-001');
      
      if (conversationIndex >= 0) {
        const newMessage = {
          id: Date.now(),
          sender: 'customer',
          content: 'Are you still there? I really need help with this login issue.',
          time: '10:42 AM',
          isRead: false
        };
        
        updatedConversations[conversationIndex].messages.push(newMessage);
        updatedConversations[conversationIndex].unreadCount += 1;
        
        setConversations(updatedConversations);
        setNewMessageAlert(true);
        
        // Actualizar la conversación seleccionada si es la misma
        if (selectedConversation && selectedConversation.id === 'chat-001') {
          setSelectedConversation(updatedConversations[conversationIndex]);
        }
      }
    }, 15000);
    
    return () => clearTimeout(messageTimer);
  }, [conversations, selectedConversation]);
  
  // Desplazarse al final del chat cuando cambia la conversación o llegan nuevos mensajes
  useEffect(() => {
    if (chatContainerRef.current && selectedConversation) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedConversation]);
  
  // Manejar la selección de una conversación
  const handleSelectConversation = (conversation) => {
    // Marcar mensajes como leídos
    const updatedConversation = {
      ...conversation,
      unreadCount: 0,
      messages: conversation.messages.map(msg => ({
        ...msg,
        isRead: true
      }))
    };
    
    setSelectedConversation(updatedConversation);
    setNewMessageAlert(false);
    
    // Actualizar el estado global de conversaciones
    const updatedConversations = conversations.map(c => 
      c.id === conversation.id ? updatedConversation : c
    );
    
    setConversations(updatedConversations);
  };
  
  // Enviar un nuevo mensaje
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedConversation) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'agent',
      content: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };
    
    // Actualizar la conversación seleccionada
    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage]
    };
    
    setSelectedConversation(updatedConversation);
    
    // Actualizar el estado global de conversaciones
    const updatedConversations = conversations.map(c => 
      c.id === selectedConversation.id ? updatedConversation : c
    );
    
    setConversations(updatedConversations);
    setMessage('');
  };
  
  // Filtrar conversaciones según la pestaña seleccionada
  const getFilteredConversations = () => {
    switch (selectedTab) {
      case 'active':
        return conversations.filter(c => c.status === 'active');
      case 'pending':
        return conversations.filter(c => c.status === 'pending');
      case 'closed':
        return conversations.filter(c => c.status === 'closed');
      default:
        return conversations;
    }
  };
  
  // Cambiar estado del agente
  const handleAgentStatusChange = (status) => {
    setAgentStatus(status);
  };
  
  // Obtener color para la prioridad
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };
  
  // Obtener color para el estado del cliente
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#4CAF50';
      case 'away': return '#FF9800';
      case 'offline': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };
  
  return (
    <div className="support-chat">
      <div className="chat-header">
        <h2>Live Chat Support</h2>
        <div className="agent-status">
          <div className="status-label">Your Status:</div>
          <div className="status-dropdown">
            <div className={`status-indicator ${agentStatus}`}></div>
            <select 
              value={agentStatus} 
              onChange={(e) => handleAgentStatusChange(e.target.value)}
              className="status-select"
            >
              <option value="online">Online</option>
              <option value="busy">Busy</option>
              <option value="away">Away</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <div className="agent-info">
            <span className="agent-name">Luis Nava</span>
            <span className="agent-role">Support Agent</span>
          </div>
        </div>
      </div>
      
      <div className="chat-container">
        {/* Lista de conversaciones */}
        <div className="chat-conversations">
          <div className="conversations-tabs">
            <div 
              className={`tab ${selectedTab === 'active' ? 'active' : ''}`}
              onClick={() => setSelectedTab('active')}
            >
              <span>Active</span>
              <div className="tab-count">
                {conversations.filter(c => c.status === 'active').length}
              </div>
            </div>
            <div 
              className={`tab ${selectedTab === 'pending' ? 'active' : ''}`}
              onClick={() => setSelectedTab('pending')}
            >
              <span>Pending</span>
              <div className="tab-count">
                {conversations.filter(c => c.status === 'pending').length}
              </div>
            </div>
            <div 
              className={`tab ${selectedTab === 'closed' ? 'active' : ''}`}
              onClick={() => setSelectedTab('closed')}
            >
              <span>Closed</span>
              <div className="tab-count">
                {conversations.filter(c => c.status === 'closed').length}
              </div>
            </div>
          </div>
          
          <div className="conversations-list">
            {loading ? (
              <div className="conversations-loading">
                <div className="loading-spinner"></div>
                <span>Loading conversations...</span>
              </div>
            ) : getFilteredConversations().length > 0 ? (
              getFilteredConversations().map((conversation) => (
                <div 
                  key={conversation.id}
                  className={`conversation-item ${selectedConversation && selectedConversation.id === conversation.id ? 'selected' : ''} ${conversation.unreadCount > 0 ? 'unread' : ''}`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div 
                    className="conversation-priority" 
                    style={{ backgroundColor: getPriorityColor(conversation.priority) }}
                  ></div>
                  <div className="conversation-avatar">
                    <div className="avatar-text">{conversation.customer.avatar}</div>
                    <div 
                      className="avatar-status" 
                      style={{ backgroundColor: getStatusColor(conversation.customer.status) }}
                    ></div>
                  </div>
                  <div className="conversation-info">
                    <div className="conversation-name">
                      {conversation.customer.name}
                      {conversation.unreadCount > 0 && (
                        <div className="unread-badge">{conversation.unreadCount}</div>
                      )}
                    </div>
                    <div className="conversation-preview">
                      {conversation.messages.length > 0
                        ? conversation.messages[conversation.messages.length - 1].content.substring(0, 35) + (conversation.messages[conversation.messages.length - 1].content.length > 35 ? '...' : '')
                        : 'No messages yet'
                      }
                    </div>
                    <div className="conversation-meta">
                      <div className="conversation-time">
                        <i className="fas fa-clock"></i>
                        <span>{conversation.duration}</span>
                      </div>
                      <div className="conversation-department">
                        <i className="fas fa-tag"></i>
                        <span>{conversation.department}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-conversations">
                <div className="no-data-icon">
                  <i className="fas fa-comments"></i>
                </div>
                <h3>No conversations</h3>
                <p>There are no {selectedTab} conversations at the moment</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Área de chat */}
        <div className="chat-main">
          {selectedConversation ? (
            <>
              <div className="chat-main-header">
                <div className="chat-customer">
                  <div className="customer-avatar">
                    <div className="avatar-text">{selectedConversation.customer.avatar}</div>
                    <div 
                      className="avatar-status" 
                      style={{ backgroundColor: getStatusColor(selectedConversation.customer.status) }}
                    ></div>
                  </div>
                  <div className="customer-info">
                    <div className="customer-name">{selectedConversation.customer.name}</div>
                    <div className="customer-email">{selectedConversation.customer.email}</div>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="chat-action-button">
                    <i className="fas fa-user"></i>
                    <span>Profile</span>
                  </button>
                  <button className="chat-action-button">
                    <i className="fas fa-ticket-alt"></i>
                    <span>Create Ticket</span>
                  </button>
                  <button className="chat-action-button">
                    <i className="fas fa-phone"></i>
                    <span>Call</span>
                  </button>
                  <button className="chat-action-button">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
              
              <div className="chat-messages" ref={chatContainerRef}>
                {selectedConversation.messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`chat-message ${message.sender} ${!message.isRead && message.sender !== 'agent' ? 'unread' : ''}`}
                  >
                    {message.sender === 'system' ? (
                      <div className="system-message">
                        <div className="system-content">{message.content}</div>
                      </div>
                    ) : (
                      <>
                        <div className="message-avatar">
                          {message.sender === 'customer' ? (
                            selectedConversation.customer.avatar
                          ) : (
                            'LN'
                          )}
                        </div>
                        <div className="message-content">
                          <div className="message-header">
                            <span className="message-sender">
                              {message.sender === 'customer' 
                                ? selectedConversation.customer.name 
                                : 'Luis Nava'}
                            </span>
                            <span className="message-time">{message.time}</span>
                          </div>
                          <div className="message-body">{message.content}</div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                
                {newMessageAlert && (
                  <div className="new-message-alert">
                    <i className="fas fa-arrow-down"></i>
                    <span>New message</span>
                  </div>
                )}
              </div>
              
              <div className="chat-input">
                <form onSubmit={handleSendMessage}>
                  <div className="input-actions">
                    <button type="button" className="input-action">
                      <i className="fas fa-paperclip"></i>
                    </button>
                    <button type="button" className="input-action">
                      <i className="fas fa-smile"></i>
                    </button>
                    <button type="button" className="input-action">
                      <i className="fas fa-image"></i>
                    </button>
                    <button type="button" className="input-action">
                      <i className="fas fa-link"></i>
                    </button>
                  </div>
                  <div className="input-container">
                    <textarea 
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    ></textarea>
                    <button 
                      type="submit" 
                      className="send-button"
                      disabled={!message.trim()}
                    >
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
                <div className="input-tools">
                  <div className="quick-responses">
                    <button className="quick-response">Hello! How can I help you today?</button>
                    <button className="quick-response">I'm looking into this for you.</button>
                    <button className="quick-response">Could you provide more details?</button>
                    <button className="quick-response">Thank you for your patience.</button>
                    <button className="quick-response more">
                      <i className="fas fa-ellipsis-h"></i>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="chat-empty">
              <div className="empty-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3>No Conversation Selected</h3>
              <p>Select a conversation from the list to start chatting</p>
            </div>
          )}
        </div>
        
        {/* Información del cliente */}
        {selectedConversation && (
          <div className="chat-customer-info">
            <div className="customer-card">
              <div className="customer-header">
                <div className="customer-avatar-large">
                  <span>{selectedConversation.customer.avatar}</span>
                </div>
                <h3 className="customer-name-large">{selectedConversation.customer.name}</h3>
                <div className="customer-status">
                  <div 
                    className="status-indicator" 
                    style={{ backgroundColor: getStatusColor(selectedConversation.customer.status) }}
                  ></div>
                  <span className="status-text">{selectedConversation.customer.status}</span>
                </div>
                <div className="customer-email-large">{selectedConversation.customer.email}</div>
              </div>
              
              <div className="customer-details">
                <div className="detail-item">
                  <div className="detail-label">
                    <i className="fas fa-calendar-alt"></i>
                    <span>Chat Started</span>
                  </div>
                  <div className="detail-value">{selectedConversation.startTime}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">
                    <i className="fas fa-clock"></i>
                    <span>Duration</span>
                  </div>
                  <div className="detail-value">{selectedConversation.duration}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">
                    <i className="fas fa-bookmark"></i>
                    <span>Department</span>
                  </div>
                  <div className="detail-value">{selectedConversation.department}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">
                    <i className="fas fa-flag"></i>
                    <span>Priority</span>
                  </div>
                  <div 
                    className="detail-value priority"
                    style={{ color: getPriorityColor(selectedConversation.priority) }}
                  >
                    {selectedConversation.priority.charAt(0).toUpperCase() + selectedConversation.priority.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="customer-tags">
                <div className="tags-header">
                  <i className="fas fa-tags"></i>
                  <span>Tags</span>
                </div>
                <div className="tags-list">
                  {selectedConversation.tags.map((tag, index) => (
                    <div key={index} className="tag-item">
                      <span>{tag}</span>
                    </div>
                  ))}
                  <div className="tag-item add">
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="customer-actions-panel">
            <h4>Quick Actions</h4>
            <div className="action-buttons">
              <button className="customer-action">
                <i className="fas fa-user-circle"></i>
                <span>View Profile</span>
              </button>
              <button className="customer-action">
                <i className="fas fa-history"></i>
                <span>Chat History</span>
              </button>
              <button className="customer-action">
                <i className="fas fa-ticket-alt"></i>
                <span>View Tickets</span>
              </button>
              <button className="customer-action">
                <i className="fas fa-notes-medical"></i>
                <span>Patient Records</span>
              </button>
              <button className="customer-action">
                <i className="fas fa-file-invoice-dollar"></i>
                <span>Billing Info</span>
              </button>
            </div>
          </div>
          
          <div className="customer-notes">
            <div className="notes-header">
              <h4>
                <i className="fas fa-sticky-note"></i>
                <span>Agent Notes</span>
              </h4>
              <button className="add-note-button">
                <i className="fas fa-plus"></i>
                <span>Add Note</span>
              </button>
            </div>
            <div className="notes-content">
              <div className="note-item">
                <div className="note-header">
                  <div className="note-author">Luis Nava</div>
                  <div className="note-date">2023-03-14 15:45</div>
                </div>
                <div className="note-text">
                  Customer has been with us for 3 years. Had similar login issues after the January update. Very patient but needs quick resolution for patient appointments tomorrow.
                </div>
              </div>
              <div className="note-item">
                <div className="note-header">
                  <div className="note-author">Support Team</div>
                  <div className="note-date">2023-03-10 09:30</div>
                </div>
                <div className="note-text">
                  Customer reported billing issues last week that were resolved by updating payment method. May need to check if current issue is related.
                </div>
              </div>
            </div>
          </div>
          
          <div className="suggested-solutions">
            <div className="solutions-header">
              <h4>
                <i className="fas fa-lightbulb"></i>
                <span>Suggested Solutions</span>
              </h4>
            </div>
            <div className="solutions-list">
              <div className="solution-item">
                <div className="solution-title">
                  <i className="fas fa-file-alt"></i>
                  <span>Password Reset Procedure</span>
                </div>
                <div className="solution-preview">
                  Step-by-step guide for helping customers reset their passwords and troubleshoot login issues.
                </div>
                <button className="solution-action">Apply</button>
              </div>
              <div className="solution-item">
                <div className="solution-title">
                  <i className="fas fa-file-alt"></i>
                  <span>Account Verification Issues</span>
                </div>
                <div className="solution-preview">
                  Common account verification problems and their solutions, including email verification troubleshooting.
                </div>
                <button className="solution-action">Apply</button>
              </div>
              <div className="solution-item">
                <div className="solution-title">
                  <i className="fas fa-file-alt"></i>
                  <span>Billing and Login Connection</span>
                </div>
                <div className="solution-preview">
                  How billing status can affect login capabilities and steps to resolve these interdependencies.
                </div>
                <button className="solution-action">Apply</button>
              </div>
            </div>
          </div>
          
          <div className="satisfaction-status">
            <div className="satisfaction-header">
              <h4>Customer Satisfaction</h4>
            </div>
            <div className="satisfaction-rating">
              <div className="rating-score">
                <span className="score">98%</span>
                <span className="label">Satisfaction</span>
              </div>
              <div className="rating-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
            <div className="satisfaction-history">
              <div className="history-label">Previous Interactions</div>
              <div className="history-bars">
                <div className="history-bar">
                  <div className="bar-fill" style={{ width: '100%' }}></div>
                  <span className="bar-label">Mar 05</span>
                </div>
                <div className="history-bar">
                  <div className="bar-fill" style={{ width: '90%' }}></div>
                  <span className="bar-label">Feb 20</span>
                </div>
                <div className="history-bar">
                  <div className="bar-fill" style={{ width: '100%' }}></div>
                  <span className="bar-label">Feb 12</span>
                </div>
                <div className="history-bar">
                  <div className="bar-fill" style={{ width: '85%' }}></div>
                  <span className="bar-label">Jan 28</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
    </div>
  );
};

export default SupportChat;