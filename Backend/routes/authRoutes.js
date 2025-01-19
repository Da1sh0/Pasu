const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const sql = require('mssql');
const dbConfig = require('../server');
// Simulación de una base de datos de usuarios
const usuarios = [
  { id: 1, usuario: 'admin', contrasena: '1234' },
  { id: 2, usuario: 'user1', contrasena: 'abcd' }
];

// Ruta de inicio de sesión (POST)
router.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;
    // Buscar el usuario en la "base de datos"
    if (!usuario || !contrasena) {
      return res.status(400).json({ message: 'Por favor, ingrese usuario y contraseña.' });
    }
    try {
      // Conexión a la base de datos
      const pool = await sql.connect(dbConfig);
      const result = await pool.request()
      .input('usuario', sql.VarChar, usuario)
      .query('SELECT * FROM Personas WHERE usuario = @usuario');
      // Comparar Usuario
      const user = result.recordset[0];
      if (!user) {return res.status(404).json({ message: 'Usuario no encontrado.' })};
      // Comparar contraseñas
      const isMatch = await bcrypt.compare(contrasena, user.contrasena);
      if (!isMatch) {return res.status(401).json({ message: 'Contraseña incorrecta.' })};
      // Si todo está bien, retornar una respuesta exitosa
      res.status(200).json({ message: 'Login exitoso' });
    } catch (error) {
      console.error('Error en el servidor:', error);
      res.status(500).json({ message: 'Error en el servidor.' });
    }
});

// Ruta para crear un nuevo usuario (POST)
router.post('/register', async (req, res) => {
    const { nombre1, nombre2, apellido1, apellido2, celular, correo, usuario, contrasena } = req.body;
  
    try {
      // Verificar si el correo ya existe
      const resultCorreo = await sql.query`SELECT * FROM Personas WHERE correo = ${correo}`;
      if (resultCorreo.recordset.length > 0) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
      }
  
      // Verificar si el usuario ya existe
      const resultUsuario = await sql.query`SELECT * FROM Personas WHERE usuario = ${usuario}`;
      if (resultUsuario.recordset.length > 0) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }
  
      // Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);
  
      // Insertar en la tabla Personas
      await sql.query`
        INSERT INTO Personas (nombre1, nombre2, apellido1, apellido2, celular, correo, usuario, contrasena)
        VALUES (${nombre1}, ${nombre2}, ${apellido1}, ${apellido2}, ${celular}, ${correo}, ${usuario}, ${contrasenaEncriptada})`;
  
      // Retornar éxito
      res.status(201).json({ message: 'Usuario creado exitosamente' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el usuario' });
    }
  });

module.exports = router;
