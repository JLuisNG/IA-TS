import React, { useState, useEffect } from 'react';
import '../../styles/accounting/TherapistFinancialList.scss';

const TherapistFinancialList = ({ therapists, onTherapistClick, selectedPeriod }) => {
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'earnings', direction: 'desc' });
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [animatedItems, setAnimatedItems] = useState([]);
  
  // Efecto para aplicar filtros y ordenamiento
  useEffect(() => {
    let result = [...therapists];
    
    // Aplicar filtro de búsqueda
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(therapist => 
        therapist.name.toLowerCase().includes(lowercasedSearch) ||
        therapist.role.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Aplicar filtro de rol
    if (roleFilter !== 'all') {
      result = result.filter(therapist => therapist.role === roleFilter);
    }
    
    // Aplicar filtro de estado
    if (statusFilter !== 'all') {
      result = result.filter(therapist => therapist.status === statusFilter);
    }
    
    // Aplicar ordenamiento
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredTherapists(result);
    
    // Animación escalonada de entrada
    const timer = setTimeout(() => {
      setAnimatedItems(result.map(t => t.id));
    }, 100);
    
    return () => clearTimeout(timer);
  }, [therapists, searchTerm, sortConfig, roleFilter, statusFilter]);
  
  // Función para cambiar ordenamiento
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Función para obtener clase para título de columna ordenable
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return 'fas fa-sort';
    }
    return sortConfig.direction === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  };
  
  // Función para calcular porcentaje de progreso visual
  const calculateProgressPercentage = (value, max = 100) => {
    return Math.min(Math.max((value / max) * 100, 0), 100);
  };
  
  // Función para formatear valor monetario
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(value);
  };
  
  // Obtener roles disponibles para el filtro
  const availableRoles = ['all', ...new Set(therapists.map(t => t.role))];
  
  return (
    <div className="therapist-financial-list">
      {/* Barra de filtros */}
      <div className="list-filters">
        <div className="search-filter">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Search therapist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        
        <div className="dropdown-filters">
            <div className="filter-group">
              <label>Role:</label>
              <div className="select-wrapper">
                <select 
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  {availableRoles.filter(role => role !== 'all').map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
            
            <div className="filter-group">
              <label>Status:</label>
              <div className="select-wrapper">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                </select>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
          
          <div className="list-actions">
            <button className="export-btn">
              <i className="fas fa-file-export"></i>
              <span>Export</span>
            </button>
            <button className="refresh-btn">
              <i className="fas fa-sync-alt"></i>
              <span>Refresh</span>
            </button>
          </div>
        </div>
      
      {/* Lista de terapeutas */}
      <div className="therapists-table-container">
        {filteredTherapists.length > 0 ? (
          <table className="therapists-table">
            <thead>
              <tr>
                <th>Therapist</th>
                <th 
                  className="sortable"
                  onClick={() => requestSort('visits')}
                >
                  Visits
                  <i className={getSortIndicator('visits')}></i>
                </th>
                <th 
                  className="sortable"
                  onClick={() => requestSort('earnings')}
                >
                  Earnings
                  <i className={getSortIndicator('earnings')}></i>
                </th>
                <th 
                  className="sortable"
                  onClick={() => requestSort('completionRate')}
                >
                  Completion Rate
                  <i className={getSortIndicator('completionRate')}></i>
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTherapists.map((therapist, index) => (
                <tr 
                  key={therapist.id}
                  className={`${animatedItems.includes(therapist.id) ? 'animate-in' : ''}`}
                  style={{ '--animation-order': index }}
                >
                  <td className="therapist-info">
                    <div className="therapist-avatar">
                      {therapist.avatar ? (
                        <img src={therapist.avatar} alt={therapist.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {therapist.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div className={`role-indicator ${therapist.role.toLowerCase()}`}>{therapist.role}</div>
                    </div>
                    <div className="therapist-details">
                      <div className="therapist-name">{therapist.name}</div>
                      <div className="patient-count">
                        <i className="fas fa-user-injured"></i>
                        <span>{therapist.patients ? therapist.patients.length : 0} patients</span>
                      </div>
                    </div>
                  </td>
                  <td className="visits-cell">
                    <div className="value-with-indicator">
                      <span className="primary-value">{therapist.visits}</span>
                      {therapist.pendingVisits > 0 && (
                        <span className="indicator pending-indicator" title={`${therapist.pendingVisits} pending visits`}>
                          +{therapist.pendingVisits}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="earnings-cell">
                    <div className="earnings-value">{formatCurrency(therapist.earnings)}</div>
                  </td>
                  <td className="completion-cell">
                    <div className="completion-wrapper">
                      <div className="completion-bar">
                        <div 
                          className="completion-progress"
                          style={{ width: `${calculateProgressPercentage(therapist.completionRate)}%` }}
                        ></div>
                      </div>
                      <div className="completion-value">{therapist.completionRate}%</div>
                    </div>
                  </td>
                  <td className="status-cell">
                    <div className={`status-badge ${therapist.status}`}>
                      <i className={`fas ${therapist.status === 'verified' ? 'fa-check-circle' : 'fa-clock'}`}></i>
                      <span>{therapist.status === 'verified' ? 'Verified' : 'Pending'}</span>
                    </div>
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="view-details-btn"
                      onClick={() => onTherapistClick(therapist)}
                    >
                      <i className="fas fa-file-invoice-dollar"></i>
                      <span>Details</span>
                    </button>
                    <button className="action-btn print">
                      <i className="fas fa-print"></i>
                    </button>
                    <button className="action-btn verify">
                      <i className="fas fa-check"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <i className="fas fa-search"></i>
            </div>
            <h3>No therapists found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
      
      {/* Resumen de filtros y resultados */}
      {filteredTherapists.length > 0 && (
        <div className="results-summary">
          <div className="summary-text">
            Showing {filteredTherapists.length} of {therapists.length} therapists
            {(searchTerm || roleFilter !== 'all' || statusFilter !== 'all') && (
              <button 
                className="clear-filters"
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all');
                  setStatusFilter('all');
                }}
              >
                <i className="fas fa-times"></i>
                <span>Clear filters</span>
              </button>
            )}
          </div>
          
          {selectedPeriod && (
            <div className="period-reminder">
              <i className="fas fa-calendar-alt"></i>
              <span>Data for period: <strong>{selectedPeriod.period}</strong></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TherapistFinancialList;