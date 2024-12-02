const { createPool } = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "registrapp",
    connectionLimit: 15
});

// Ruta para registrar asistencia
app.post('/api/asistencia', (req, res) => {
    const { usuario_id } = req.body;

    if (!usuario_id) {
        return res.status(400).json({ error: 'El usuario_id es requerido' });
    }

    pool.query(
        'INSERT INTO asistencia (usuario_id) VALUES (?)',
        [usuario_id],
        (err, result) => {
            if (err) {
                console.error('Error registrando asistencia:', err);
                return res.status(500).json({ error: 'Error al registrar asistencia' });
            }
            res.status(200).json({ message: 'Asistencia registrada con éxito', asistenciaId: result.insertId });
        }
    );
});



// Ruta para manejar el registro de usuarios
app.post('/api/usuarioo', (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    // Consulta para insertar los datos en la tabla `usuarioo`
    pool.query(
        `INSERT INTO usuarioo (nombre, correo, contrasena) VALUES (?, ?, ?)`,
        [nombre, correo, contrasena],
        (err, result) => {
            if (err) {
                console.error('Error insertando usuario:', err);
                return res.status(500).json({ error: 'Error al registrar el usuario' });
            }

            res.status(200).json({ message: 'Usuario registrado con éxito' });
        }
    );
});


const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor en ejecución en http://0.0.0.0:${PORT}`);
});
