import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link aquí
// import volver from '../image/volver1.png';

const Login = () => {
  const [formData, setFormData] = useState({ usuario: '', contrasena: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Redirección al inicio de sesión

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Inicio de sesión exitoso');
        // Aquí puedes guardar el token si lo recibes
        localStorage.setItem('authToken', data.token); // Ejemplo de guardado de token
        navigate('/dashboard'); // Redirige a una página de inicio (puedes cambiarla)
      } else {
        setError(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <>
      <div className='contenedor-horizontal'>
        <div className='circulo1'></div>
        <div className='info1'>
          <div className='volver'>
            <Link to="/">
                <button className='bt-volver' type="button"></button>
            </Link>
          </div>
          <h1>Inicio de Sesión</h1>
          <form onSubmit={handleSubmit}>
              <div className='contenedor-campo'>
                <label htmlFor="usuario">Usuario: </label>
                <input type="text" id="usuario" name="usuario" value={formData.usuario} onChange={handleChange} placeholder='Usuario' required/>
              </div>
              <div className='contenedor-campo'>
                <label htmlFor="contrasena">Contraseña: </label>
                <input type="password" id="contrasena" name="contrasena" value={formData.contrasena} onChange={handleChange} placeholder='Contraseña' required/>
              </div>
              {error && <p style={{ color: '#e87c6e' }}>{error}</p>} {/* Mostrar error si existe */}
              <div className='botones'>
                <button className='boton' type="submit">Iniciar Sesión</button>
                <Link to="/Register">
                  <button className='boton' type="button">No tengo una cuenta</button>
                </Link>
              </div>
          </form>
        </div>
        <div className='circulo2'></div>
      </div>
    </>
  );
};

export default Login;
