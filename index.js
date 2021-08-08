const express = require('express');
const conectarDB = require('./config/db');
const auth = require('./middleware/auth');

const app = express()
const port = process.env.PORT || 4000

// Conectar a la base de datos
conectarDB();

// Habilitar leer los valores de un body
app.use(express.json());

// Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))