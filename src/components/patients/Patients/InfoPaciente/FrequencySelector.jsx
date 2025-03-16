import React, { useState, useEffect, useRef } from 'react';
import '../../../../styles/Patients/InfoPaciente/FrequencySelector.scss';

const FrequencySelector = ({ currentValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [customInput, setCustomInput] = useState('');
  
  useEffect(() => {
    setCustomInput(currentValue);
  }, [currentValue]);
  
  useEffect(() => {
    // Cerrar el dropdown cuando se hace clic afuera
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const commonFrequencies = [
    { value: '1W1', label: '1 visit per week' },
    { value: '1W2', label: '2 visits per week' },
    { value: '1W3', label: '3 visits per week' },
    { value: '2W1', label: '1 visit every 2 weeks' },
    { value: '2W2 1W1', label: '2 visits per week for 2 weeks, then 1 per week' },
    { value: '3W2 2W2', label: '2 visits per week for 3 weeks, then 2 every 2 weeks' },
    { value: 'NO FREQUENCY SET', label: 'No frequency set' }
  ];
  
  const selectFrequency = (value) => {
    onChange(value);
    setIsOpen(false);
  };
  
  const handleCustomInputChange = (e) => {
    setCustomInput(e.target.value);
  };
  
  const applyCustomFrequency = () => {
    if (customInput.trim()) {
      onChange(customInput.trim());
    }
    setIsOpen(false);
  };
  
  const getDisplayValue = () => {
    const found = commonFrequencies.find(f => f.value === currentValue);
    return found ? found.label : currentValue;
  };
  
  return (
    <div className="frequency-selector-container" ref={dropdownRef}>
      <div 
        className={`frequency-selector ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="selected-frequency">
          <i className="fas fa-calendar-alt"></i>
          <span>{getDisplayValue()}</span>
        </div>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </div>
      
      {isOpen && (
        <div className="frequency-dropdown">
          <div className="dropdown-section">
            <h4>Common Frequencies</h4>
            <div className="frequency-options">
              {commonFrequencies.map((frequency) => (
                <div 
                  key={frequency.value}
                  className={`frequency-option ${currentValue === frequency.value ? 'active' : ''}`}
                  onClick={() => selectFrequency(frequency.value)}
                >
                  <span>{frequency.label}</span>
                  {currentValue === frequency.value && <i className="fas fa-check"></i>}
                </div>
              ))}
            </div>
          </div>
          
          <div className="dropdown-divider"></div>
          
          <div className="dropdown-section">
            <h4>Custom Frequency</h4>
            <div className="custom-input-container">
              <input
                type="text"
                value={customInput}
                onChange={handleCustomInputChange}
                placeholder="e.g., 2W3 1W2"
                onKeyDown={(e) => e.key === 'Enter' && applyCustomFrequency()}
              />
              <button className="apply-btn" onClick={applyCustomFrequency}>
                Apply
              </button>
            </div>
            <div className="format-help">
              <i className="fas fa-info-circle"></i>
              <span>Format: [Weeks]W[Visits] e.g., 2W3 = 3 visits for 2 weeks</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrequencySelector;