import React, { useState, useEffect, useRef } from 'react';
import '../../styles/accounting/AccountingDashboard.scss';

const AccountingDashboard = ({ stats, selectedPeriod }) => {
  const [animateMetrics, setAnimateMetrics] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedValues, setAnimatedValues] = useState({
    totalBilled: 0,
    pendingPayments: 0,
    completedPayments: 0,
    averagePerVisit: 0
  });
  
  const chartCanvasRef = useRef(null);
  
  // Activar animaciones al montar el componente
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateMetrics(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animar valores de las métricas
  useEffect(() => {
    if (animateMetrics && stats) {
      const duration = 1500; // Duración total de la animación
      const steps = 60; // Número de pasos de la animación (para 60fps)
      const stepTime = duration / steps;
      let step = 0;
      
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        
        // Función de easing para hacer la animación más natural
        // Ease Out Cubic: t => 1 - Math.pow(1 - t, 3)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        setAnimatedValues({
          totalBilled: Math.round(easedProgress * stats.totalBilled * 100) / 100,
          pendingPayments: Math.round(easedProgress * stats.pendingPayments * 100) / 100,
          completedPayments: Math.round(easedProgress * stats.completedPayments * 100) / 100,
          averagePerVisit: Math.round(easedProgress * stats.averagePerVisit * 100) / 100
        });
        
        if (step >= steps) {
          clearInterval(interval);
        }
      }, stepTime);
      
      return () => clearInterval(interval);
    }
  }, [animateMetrics, stats]);
  
  // Renderizar gráfico cuando cambian los datos o el canvas
  useEffect(() => {
    if (chartCanvasRef.current && stats?.revenueByMonth) {
      renderChart();
    }
  }, [stats, chartCanvasRef.current, activeTab]);
  
  // Función para renderizar gráfico
  const renderChart = () => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Datos para el gráfico
    const data = stats.revenueByMonth;
    const maxRevenue = Math.max(...data.map(item => item.revenue));
    const padding = { top: 30, right: 30, bottom: 40, left: 60 };
    
    // Área de dibujo
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Dibujar ejes
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    
    // Eje X
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    
    // Eje Y
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.stroke();
    
    // Dibujar líneas de referencia horizontales
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.setLineDash([5, 5]);
    
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
      const y = padding.top + (chartHeight / ySteps) * i;
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      
      // Etiquetas del eje Y (valores)
      const value = maxRevenue - (maxRevenue / ySteps) * i;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '12px Poppins, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 }), padding.left - 10, y + 4);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Dibujar área bajo la curva
    ctx.beginPath();
    const barWidth = chartWidth / data.length * 0.6;
    const barSpacing = chartWidth / data.length * 0.4;
    
    // Crear gradiente para las barras
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(0, 188, 212, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 188, 212, 0.2)');
    
    // Dibujar barras
    data.forEach((item, index) => {
      const x = padding.left + (chartWidth / data.length) * index + (chartWidth / data.length - barWidth) / 2;
      const barHeight = (item.revenue / maxRevenue) * chartHeight;
      const y = height - padding.bottom - barHeight;
      
      // Barra con gradiente
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Borde superior redondeado con brillo
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0, 229, 255, 0.9)';
      ctx.roundRect(x, y, barWidth, 4, [2, 2, 0, 0]);
      ctx.fill();
      
      // Valor encima de la barra
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '12px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('$' + item.revenue.toLocaleString('en-US', { maximumFractionDigits: 0 }), x + barWidth / 2, y - 10);
      
      // Etiqueta del eje X (mes)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '12px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.month, x + barWidth / 2, height - padding.bottom + 20);
    });
  };
  
  // Función para formatear valores monetarios
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Calcular porcentaje completado
  const calculateCompletionPercentage = () => {
    const total = stats.totalBilled;
    return total > 0 ? (stats.completedPayments / total * 100).toFixed(1) : 0;
  };

  return (
    <div className={`accounting-dashboard ${animateMetrics ? 'animate-in' : ''}`}>
      <div className="dashboard-header">
        <h2>Financial Overview</h2>
        
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-chart-line"></i>
            <span>Overview</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'revenue' ? 'active' : ''}`}
            onClick={() => setActiveTab('revenue')}
          >
            <i className="fas fa-dollar-sign"></i>
            <span>Revenue</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'visits' ? 'active' : ''}`}
            onClick={() => setActiveTab('visits')}
          >
            <i className="fas fa-calendar-check"></i>
            <span>Visits</span>
          </button>
        </div>
        
        {selectedPeriod && (
          <div className="period-badge">
            <i className="fas fa-calendar-alt"></i>
            <span>{selectedPeriod.period}</span>
          </div>
        )}
      </div>
      
      <div className="dashboard-content">
        {/* Métricas principales */}
        <div className="metrics-section">
          <div className="metric-card total-billed">
            <div className="metric-icon">
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <div className="metric-content">
              <h3 className="metric-title">Total Billed</h3>
              <div className="metric-value">
                {formatCurrency(animatedValues.totalBilled)}
              </div>
              <div className="metric-footer">
                {selectedPeriod && (
                  <span>Period: {selectedPeriod.period}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="metric-card pending-payments">
            <div className="metric-icon">
              <i className="fas fa-hourglass-half"></i>
            </div>
            <div className="metric-content">
              <h3 className="metric-title">Pending Payments</h3>
              <div className="metric-value">
                {formatCurrency(animatedValues.pendingPayments)}
              </div>
              <div className="metric-footer">
                <div className="badge awaiting">
                  <i className="fas fa-clock"></i>
                  <span>Awaiting Verification</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="metric-card completed-payments">
            <div className="metric-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="metric-content">
              <h3 className="metric-title">Completed Payments</h3>
              <div className="metric-value">
                {formatCurrency(animatedValues.completedPayments)}
              </div>
              <div className="metric-footer">
                <div className="completion-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${calculateCompletionPercentage()}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{calculateCompletionPercentage()}% of total</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="metric-card average-visit">
            <div className="metric-icon">
              <i className="fas fa-calculator"></i>
            </div>
            <div className="metric-content">
              <h3 className="metric-title">Average Per Visit</h3>
              <div className="metric-value">
                {formatCurrency(animatedValues.averagePerVisit)}
              </div>
              <div className="metric-footer">
                <span>Based on all completed visits</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gráfico de ingresos */}
        <div className="chart-section">
          <div className="chart-header">
            <h3>
              <i className="fas fa-chart-bar"></i>
              Revenue by Month
            </h3>
            <div className="chart-actions">
              <button className="chart-action">
                <i className="fas fa-download"></i>
                <span>Export</span>
              </button>
              <button className="chart-action">
                <i className="fas fa-sync-alt"></i>
                <span>Refresh</span>
              </button>
            </div>
          </div>
          
          <div className="chart-container">
            <canvas 
              ref={chartCanvasRef}
              width={900}
              height={300}
              className="revenue-chart"
            ></canvas>
          </div>
        </div>
        
        {/* Desglose por disciplina */}
        {stats.visitsByDiscipline && (
          <div className="discipline-breakdown">
            <h3>Visits by Discipline</h3>
            <div className="discipline-cards">
              <div className="discipline-card pt">
                <div className="discipline-icon">
                  <i className="fas fa-walking"></i>
                </div>
                <div className="discipline-content">
                  <h4>Physical Therapy</h4>
                  <div className="discipline-count">
                    {stats.visitsByDiscipline.PT} <span>visits</span>
                  </div>
                </div>
                <div className="discipline-percentage">
                  {Math.round(stats.visitsByDiscipline.PT / 
                    (stats.visitsByDiscipline.PT + 
                     stats.visitsByDiscipline.OT + 
                     stats.visitsByDiscipline.ST) * 100)}%
                </div>
              </div>
              
              <div className="discipline-card ot">
                <div className="discipline-icon">
                  <i className="fas fa-hands"></i>
                </div>
                <div className="discipline-content">
                  <h4>Occupational Therapy</h4>
                  <div className="discipline-count">
                    {stats.visitsByDiscipline.OT} <span>visits</span>
                  </div>
                </div>
                <div className="discipline-percentage">
                  {Math.round(stats.visitsByDiscipline.OT / 
                    (stats.visitsByDiscipline.PT + 
                     stats.visitsByDiscipline.OT + 
                     stats.visitsByDiscipline.ST) * 100)}%
                </div>
              </div>
              
              <div className="discipline-card st">
                <div className="discipline-icon">
                  <i className="fas fa-comment-medical"></i>
                </div>
                <div className="discipline-content">
                  <h4>Speech Therapy</h4>
                  <div className="discipline-count">
                    {stats.visitsByDiscipline.ST} <span>visits</span>
                  </div>
                </div>
                <div className="discipline-percentage">
                  {Math.round(stats.visitsByDiscipline.ST / 
                    (stats.visitsByDiscipline.PT + 
                     stats.visitsByDiscipline.OT + 
                     stats.visitsByDiscipline.ST) * 100)}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountingDashboard;