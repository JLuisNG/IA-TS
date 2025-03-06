import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLoadingModal from './AuthLoadingModal';
import PremiumAuthAnimation from '../../components/Login/PremiumAuthAnimation';
import logoImg from '../../assets/LogoMHC.jpeg';
const Login = ({ onForgotPassword, onContactUs }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    message: ''
  });
  
  // Estado para el modal de carga
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    status: 'loading', // 'loading', 'success', 'error'
    message: ''
  });

  // Lista de credenciales válidas (después se moverían al backend)
  const validCredentials = [
    { username: "JLuis09", password: "Kariokito12" },
    { username: "Javi1", password: "JavierVargas12" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  const showError = (field, message) => {
    setErrors({
      ...errors,
      [field]: true,
      message: message
    });
    
    // Efecto de pulsación
    const element = document.getElementById(`${field}Group`);
    if (element) {
      element.classList.add("form-pulse");
      setTimeout(() => {
        element.classList.remove("form-pulse");
      }, 500);
    }
  };

  const showSuccess = (field) => {
    const element = document.getElementById(`${field}Group`);
    if (element) {
      element.classList.remove("error");
      element.classList.add("success");
    }
  };

  const validateForm = () => {
    let isValid = true;
    
    if (formData.username.trim() === "") {
      showError('username', "Username cannot be empty");
      isValid = false;
    }
    
    if (formData.password === "") {
      showError('password', "Password cannot be empty");
      isValid = false;
    }
    
    return isValid; 
  };
  
  // Función para cerrar el modal
  const closeAuthModal = () => {
    setAuthModal({
      ...authModal,
      isOpen: false
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar el formulario
    if (!validateForm()) {
      return;
    }
    
    // Verificar credenciales rápidamente primero
    const isValid = validCredentials.some(
      cred => cred.username === formData.username && cred.password === formData.password
    );
    
    // Si las credenciales no son válidas, mostrar error inmediatamente sin abrir el modal
    if (!isValid) {
      showError('username', "Usuario o contraseña inválidos");
      showError('password', "Usuario o contraseña inválidos");
      
      // Efecto visual para errores
      document.querySelectorAll(".login__input").forEach(input => {
        input.style.transition = "transform 0.1s ease";
        input.style.transform = "translateX(5px)";
        setTimeout(() => {
          input.style.transform = "translateX(-5px)";
          setTimeout(() => {
            input.style.transform = "translateX(0)";
          }, 100);
        }, 100);
      });
      
      return;
    }
    
    // Si las credenciales son válidas, mostrar el modal de carga
    setAuthModal({
      isOpen: true,
      status: 'loading',
      message: 'Verificando datos...'
    });
    
    // Simulación del proceso de autenticación exitoso (más lento para mejor visualización)
    setTimeout(() => {
      // Actualizar modal a éxito
      setAuthModal({
        isOpen: true,
        status: 'success',
        message: '¡Autenticación exitosa! Redirigiendo...'
      });
      
      // Mostrar efecto de éxito en los campos
      showSuccess('username');
      showSuccess('password');
      
      // Redirigir después de mostrar el mensaje de éxito
      setTimeout(() => {
        navigate('/welcome');
      }, 2000);
    }, 4500); // Aumentamos a 4.5 segundos para una visualización más completa
  };

  // Efecto del botón cuando se pasa el cursor
  useEffect(() => {
    const loginButtons = document.querySelectorAll(".login__button");
    
    const handleMouseMove = function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this.style.background = `radial-gradient(circle at ${x}px ${y}px, 
                              #1484c5 0%, 
                              #18618b 50%, 
                              #6b1b99 100%)`;
    };
    
    const handleMouseLeave = function() {
      this.style.background = "linear-gradient(135deg, #1484c5, #18618b)";
    };
    
    loginButtons.forEach(button => {
      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);
    });
    
    return () => {
      loginButtons.forEach(button => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Efecto de enfoque para los inputs
  useEffect(() => {
    const inputs = document.querySelectorAll(".login__input");
    
    const handleFocus = function() {
      this.parentElement.parentElement?.classList.add("form-focus");
    };
    
    const handleBlur = function() {
      this.parentElement.parentElement?.classList.remove("form-focus");
    };
    
    inputs.forEach(input => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });
    
    return () => {
      inputs.forEach(input => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, []);

  return (
    <>
      <div className="login__logo">
        <img src={logoImg} alt="Motive Homecare Logo" className="login__logo-img" />
      </div>
      
      <h2 className="login__title">Login</h2>
      
      <form id="loginForm" className="login__form" onSubmit={handleSubmit}>
        <div className={`login__form-group ${errors.username ? 'error' : ''}`} id="usernameGroup">
          <label htmlFor="username" className="login__label">
            <i className="fas fa-user"></i>
            Username
          </label>
          <div className="login__input-wrapper">
            <input 
              type="text" 
              id="username" 
              name="username" 
              className="login__input" 
              placeholder="Enter your username" 
              value={formData.username}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="login__error-message">
            {errors.username ? errors.message : "Please enter a valid username"}
          </div>
        </div>
        
        <div className={`login__form-group ${errors.password ? 'error' : ''}`} id="passwordGroup">
          <label htmlFor="password" className="login__label">
            <i className="fas fa-lock"></i>
            Password
          </label>
          <div className="login__input-wrapper">
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="login__input" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="login__error-message">
            {errors.password ? errors.message : "Please enter a valid password"}
          </div>
        </div>
        
        <button type="submit" className="login__button">LOG IN</button>
      </form>
      
      <div className="login__extra-links">
        <button className="login__link" onClick={onForgotPassword}>Forgot your password?</button>
      </div>
      
      {/* Modal de carga para autenticación */}
      <AuthLoadingModal 
        isOpen={authModal.isOpen}
        status={authModal.status}
        message={authModal.message}
        onClose={closeAuthModal}
      />
    </>
  );
};

export default Login;