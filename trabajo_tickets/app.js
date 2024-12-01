require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sistema_tickets'
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  }
  console.log('Conectado a la base de datos');
});

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Sistema de Tickets');
});

// Ruta para obtener los módulos
app.get('/api/modulos', (req, res) => {
  db.query('SELECT modulo_id, nombre FROM MODULO WHERE vigente = TRUE', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los módulos' });
      return;
    }
    res.json(results);
  });
});

// Ruta para obtener las severidades
app.get('/api/severidades', (req, res) => {
  db.query('SELECT severidad_id, descripcion FROM SEVERIDAD', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener las severidades' });
      return;
    }
    res.json(results);
  });
});

// Ruta para obtener los clientes
app.get('/api/clientes', (req, res) => {
  db.query('SELECT usuario_id, nombre FROM USUARIO', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los clientes' });
      return;
    }
    res.json(results);
  });
});

// Iniciar el servidor

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.post('/api/tickets', (req, res) => {
  const { usuario_id, modulo_id, severidad_id, prioridad_id, descripcion_breve, descripcion_detallada } = req.body;

  const sqlInsertTicket = `
    INSERT INTO TICKET (usuario_id, modulo_id, severidad_id, prioridad_id, descripcion_breve, descripcion_detallada, estado)
    VALUES (?, ?, ?, ?, ?, ?, 'Trabajando en solución')
  `;

  db.query(sqlInsertTicket, [usuario_id, modulo_id, severidad_id, prioridad_id, descripcion_breve, descripcion_detallada], (err, result) => {
    if (err) {
      console.error('Error al insertar el ticket:', err);
      res.status(500).json({ error: 'Error al crear el ticket' });
      return;
    }

    // Obtener el ID del ticket creado
    const ticketId = result.insertId;

    // Responder con el número del ticket creado
    res.status(201).json({ ticketId });
  });
});
