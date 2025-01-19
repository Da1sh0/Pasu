import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './styles/general.css';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Página Principal (Index) */}
        <Routes>
          <Route path="/" element={
              <div className="Index">
                <h1>Bienvenido a Pasu</h1>
                <Link to="/login"> <button>Iniciar Sesión</button> </Link>
                <Link to="/register"> <button>Crear una cuenta</button> </Link>
              </div> }
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
