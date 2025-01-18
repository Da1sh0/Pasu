import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Página Principal */}
        <div>
          <h1>Página Principal</h1>
          <Link to="/login">
            <button>Ir al Login</button>
          </Link>
        </div>

        {/* Rutas */}
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Puedes agregar más rutas aquí si es necesario */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;