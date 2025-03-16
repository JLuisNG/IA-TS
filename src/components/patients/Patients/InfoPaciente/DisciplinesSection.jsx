import React, { useState, useEffect } from 'react';
import PhysicalTherapy from './PhysicalTherapy.jsx';
import OccupationalTherapy from './OccupationalTherapy.jsx';
import SpeechTherapy from './SpeechTherapy.jsx';
import '../../../../styles/Patients/InfoPaciente/DisciplinesSection.scss';

const DisciplinesSection = ({ patientId }) => {
  const [activeSection, setActiveSection] = useState('physical');
  const [isLoading, setIsLoading] = useState(true);
  const [therapists, setTherapists] = useState({
    physical: [],
    occupational: [],
    speech: []
  });
  
  // Simulación de carga de datos
  useEffect(() => {
    const fetchTherapists = async () => {
      setIsLoading(true);
      // Aquí se implementaría la llamada a la API real
      setTimeout(() => {
        setTherapists({
          physical: [
            { id: 1, name: 'Araquel, Regina', role: 'PT', phone: '(917) 617-6012', email: 'raraquel@therapy.com', isActive: true },
            { id: 2, name: 'Staffey, Jacob', role: 'PTA', phone: '(310) 902-0768', email: 'jstaffey@therapy.com', isActive: true }
          ],
          occupational: [
            { id: 3, name: 'Shimane, Justin', role: 'OT', phone: '(310) 529-8395', email: 'jshimane@therapy.com', isActive: true },
            { id: 4, name: 'Kim, April', role: 'COTA', phone: '(562) 242-8175', email: 'akim@therapy.com', isActive: true }
          ],
          speech: [
            { id: 5, name: 'Martinez, Elena', role: 'ST', phone: '(213) 456-7890', email: 'emartinez@therapy.com', isActive: true },
            { id: 6, name: 'Johnson, Mark', role: 'STA', phone: '(310) 765-4321', email: 'mjohnson@therapy.com', isActive: false }
          ]
        });
        setIsLoading(false);
      }, 1200);
    };

    fetchTherapists();
  }, [patientId]);

  const handleSectionChange = (section) => {
    setIsLoading(true);
    setActiveSection(section);
    setTimeout(() => setIsLoading(false), 600);
  };

  const getDisciplineColor = (discipline) => {
    switch(discipline) {
      case 'physical': return 'discipline-green';
      case 'occupational': return 'discipline-orange';
      case 'speech': return 'discipline-purple';
      default: return '';
    }
  };

  const renderDisciplineContent = () => {
    if (isLoading) {
      return (
        <div className="discipline-loading">
          <div className="loading-pulse"></div>
          <span className="loading-text">Cargando información de terapeutas...</span>
        </div>
      );
    }

    switch(activeSection) {
      case 'physical':
        return <PhysicalTherapy therapists={therapists.physical} patientId={patientId} />;
      case 'occupational':
        return <OccupationalTherapy therapists={therapists.occupational} patientId={patientId} />;
      case 'speech':
        return <SpeechTherapy therapists={therapists.speech} patientId={patientId} />;
      default:
        return null;
    }
  };

  return (
    <div className="disciplines-section">
      <div className="section-header">
        <h2 className="section-title">
          <i className="fas fa-users-medical"></i>
          Disciplines
        </h2>
      </div>

      <div className="disciplines-content">
        <div className="disciplines-tabs">
          <button 
            className={`discipline-tab ${activeSection === 'physical' ? 'active' : ''} ${getDisciplineColor('physical')}`}
            onClick={() => handleSectionChange('physical')}
          >
            <i className="fas fa-walking"></i>
            <span>Physical Therapy</span>
            <span className="therapist-count">{therapists.physical.length}</span>
          </button>
          <button 
            className={`discipline-tab ${activeSection === 'occupational' ? 'active' : ''} ${getDisciplineColor('occupational')}`}
            onClick={() => handleSectionChange('occupational')}
          >
            <i className="fas fa-hands"></i>
            <span>Occupational Therapy</span>
            <span className="therapist-count">{therapists.occupational.length}</span>
          </button>
          <button 
            className={`discipline-tab ${activeSection === 'speech' ? 'active' : ''} ${getDisciplineColor('speech')}`}
            onClick={() => handleSectionChange('speech')}
          >
            <i className="fas fa-comment-medical"></i>
            <span>Speech Language</span>
            <span className="therapist-count">{therapists.speech.length}</span>
          </button>
        </div>

        <div className="discipline-content-wrapper">
          <div className={`discipline-content ${getDisciplineColor(activeSection)}`}>
            {renderDisciplineContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisciplinesSection;