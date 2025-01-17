require('dotenv').config(); // Cargar las variables de entorno
const express = require('express');
const sql = require('mssql');
const app = express();
const port = process.env.PORT || 5000; // Puerto de escucha
// Middleware para manejar solicitudes JSON
app.use(express.json());
// Ruta de Prueba
app.get('/', (req, res) => {res.send('Hola vane acabo de montar un servidor en Node.js🦝!')});
// Iniciar el servidor
app.listen(port, () => {console.log(`Servidor escuchando en el puerto ${port}`)});

// Base de datos
// Configuracion de la conexión a SQL 
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Habilitar encriptación si es necesario
        trustServerCertificate: true, // Para evitar problemas con certificados SSL
    }
};
// Conexion a la base de datos
sql.connect(dbConfig)
    .then(() => {console.log('Conectado a la Base de datos de Pasu')})
    .catch(error =>{console.log('Error al conectarce con la base de datos de Pasu', error)});








//Usar el comando node server.js