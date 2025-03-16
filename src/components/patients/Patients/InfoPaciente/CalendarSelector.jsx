import React, { useState, useEffect } from 'react';
import '../../../../styles/Patients/InfoPaciente/CalendarSelector.scss';

const CalendarSelector = ({ onDateSelect, initialDate = null, onClose }) => {
  const [currentDate, setCurrentDate] = useState(initialDate ? new Date(initialDate) : new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate ? new Date(initialDate) : new Date());
  const [calendar, setCalendar] = useState([]);

  // Nombres de los meses en español
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Días de la semana en español (abreviados)
  const weekdays = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

  // Actualizar el calendario cuando cambie el mes o año actual
  useEffect(() => {
    generateCalendar();
  }, [currentDate]);

  // Generar la matriz de días para el calendario
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0);
    
    // Día de la semana para el primer día (0 = domingo, 1 = lunes, etc.)
    const startingDayOfWeek = firstDay.getDay();
    // Número total de días en el mes
    const daysInMonth = lastDay.getDate();
    
    // Calcular días del mes anterior para llenar la primera semana
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // Matriz para almacenar todos los días que se mostrarán
    const calendarDays = [];
    
    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      calendarDays.push({
        day: prevMonthLastDay - i,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        currentMonth: false
      });
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        month,
        year,
        currentMonth: true,
        isToday: isToday(year, month, i),
        isSelected: isSelectedDate(year, month, i)
      });
    }
    
    // Días del mes siguiente para completar la última semana
    const remainingDays = 42 - calendarDays.length; // 6 semanas completas (7*6=42)
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        day: i,
        month: month + 1,
        year: month === 11 ? year + 1 : year,
        currentMonth: false
      });
    }
    
    // Dividir en semanas (arrays de 7 días)
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    
    setCalendar(weeks);
  };

  // Comprobar si una fecha es hoy
  const isToday = (year, month, day) => {
    const today = new Date();
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  // Comprobar si una fecha es la seleccionada
  const isSelectedDate = (year, month, day) => {
    return (
      selectedDate &&
      year === selectedDate.getFullYear() &&
      month === selectedDate.getMonth() &&
      day === selectedDate.getDate()
    );
  };

  // Ir al mes anterior
  const goToPreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Ir al mes siguiente
  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Formato de fecha MM-DD-YYYY
  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  // Manejar la selección de fecha
  const handleDateSelect = (year, month, day) => {
    const newSelectedDate = new Date(year, month, day);
    setSelectedDate(newSelectedDate);
    
    if (onDateSelect) {
      onDateSelect(formatDate(newSelectedDate));
    }
  };

  // Ir a hoy
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    
    if (onDateSelect) {
      onDateSelect(formatDate(today));
    }
  };

  return (
    <div className="premium-calendar">
      <div className="calendar-header">
        <div className="month-display">
          <h2>{months[currentDate.getMonth()]} De {currentDate.getFullYear()}</h2>
        </div>
        <div className="navigation-buttons">
          <button className="nav-btn prev" onClick={goToPreviousMonth}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="nav-btn next" onClick={goToNextMonth}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      
      <div className="calendar-grid">
        <div className="weekdays">
          {weekdays.map((day, index) => (
            <div key={index} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="days">
          {calendar.map((week, weekIndex) => (
            <div key={weekIndex} className="week">
              {week.map((dateObj, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`day-cell ${dateObj.currentMonth ? 'current-month' : 'other-month'} 
                             ${dateObj.isToday ? 'today' : ''} 
                             ${dateObj.isSelected ? 'selected' : ''}`}
                  onClick={() => handleDateSelect(dateObj.year, dateObj.month, dateObj.day)}
                >
                  <span className="day-number">{dateObj.day}</span>
                  {dateObj.isToday && <div className="today-indicator"></div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="calendar-actions">
        <button className="action-btn cancel" onClick={onClose}>
          Borrar
        </button>
        <button className="action-btn today" onClick={goToToday}>
          Hoy
        </button>
      </div>
    </div>
  );
};

export default CalendarSelector;