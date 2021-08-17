const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 4000

// Conectar a la base de datos
conectarDB();

// Habilitar cors
const opcionesCors = {
    origin:process.env.FRONTEND_URL, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(opcionesCors));

// Habilitar leer los valores de un body
app.use(express.json());

// Habilitar carpeta publica
app.use('/uploads', express.static('uploads'));

// Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))