import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link aquí

const Register = () => {
  const [formData, setFormData] = useState({
    nombre1: '',nombre2: '',apellido1: '',apellido2: '',
    celular: '',correo: '',usuario: '',contrasena: ''
});
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
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuario registrado exitosamente');
        navigate('/Login'); // Redirige a la página de inicio de sesión
      } else {
        setError(data.message || 'Error en el registro');
      }
    
    } catch (error) {
      console.error('Error:', error);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className='contenedor-horizontal'>
      <div className='circulo1'></div>
      <div className='info1'>
        <div className='volver'>
          <Link to="/">
              <button className='bt-volver' type="button"></button>
          </Link>
        </div>
        <h1>Crear cuenta</h1>
          <form onSubmit={handleSubmit}>
              <div className='contenedor-campo'>
                <label htmlFor="nombres">Nombres: </label>
                <input type="text" id="nombre1" name="nombre1" value={formData.nombre1} onChange={handleChange} placeholder='Primer Nombre' required/>
                <input type="text" id="nombre2" name="nombre2" value={formData.nombre2} onChange={handleChange} placeholder='Segundo Nombre'/>
              </div>
              <div className='contenedor-campo'>
                <label htmlFor="nombres">Apellidos: </label>
                <input type="text" id="apellido1" name="apellido1" value={formData.apellido1} onChange={handleChange} placeholder='Primer Apellido' required/>
                <input type="text" id="apellido2" name="apellido2" value={formData.apellido2} onChange={handleChange} placeholder='Segundo Apellido'/>
              </div>
              <div className='contenedor-campo'>
              <label htmlFor="celular">Celular: </label>
              <input type="number" id="celular" name="celular" value={formData.celular} onChange={handleChange} placeholder='3123456789'/>
              </div>
              <div className='contenedor-campo'>
                <label htmlFor="correo">Correo: </label>
                <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} placeholder='example@dominio.com' required/>
              </div>
              <div className='contenedor-campo'>
                <label htmlFor="usuario">Usuario: </label>
                <input type="text" id="usuario" name="usuario" value={formData.usuario} onChange={handleChange} placeholder='Usuario' required/>
              </div>
              <div className='contenedor-campo'>
                <label htmlFor="contrasena">Contraseña: </label>
                <input type="password" id="contrasena" name="contrasena" value={formData.contrasena} onChange={handleChange} placeholder='contraseña' required/>
              </div>
              {error && <p style={{ color: '#e87c6e' }}>{error}</p>} {/* Mostrar error si existe */}
              <div className='botones'>
              <button className='boton' type="submit">Registrarse</button>
                <Link to="/login">
                    <button className='boton' type="button">ya tengo una cuenta</button>
                </Link>
              </div>
          </form>
      </div>
      <div className='circulo2'></div>
    </div>
  );
};
export default Register;
