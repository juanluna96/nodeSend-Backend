const express = require('express');
const conectarDB = require('./config/db');

const app = express()
const port = process.env.PORT || 4000

// Conectar a la base de datos
conectarDB();

// Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));

app.get('/', (req, res) => res.send('API NODE SEND BACKEND!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))