import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './styles/general.css';
import Register from './components/Register';
import Login from './components/Login';
import logo from './image/Logo1.png';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
              <div className='contenedor-horizontal'>
                <div className='circulo1'></div>
                <div className='info1'>
                  <img className='logo' src={logo} alt="PASU" />
                  <h1>Bienvenido a Pasu</h1>
                  <div className='botones'>
                  <Link to="/login"> <button className='boton'>Iniciar Sesión</button> </Link>
                  <Link to="/register"> <button className='boton'>Crear una cuenta</button> </Link>
                  </div>
                </div> 
                <div className='circulo2'></div>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
