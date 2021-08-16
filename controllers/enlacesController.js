const Enlace = require('../models/Enlace')
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.nuevoEnlace = async (req, res, next) => {
    // Revisar si hay errores
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    // Crear un objeto de Enlace
    const { nombre_original, nombre } = req.body;
    const enlace = new Enlace();
    enlace.url = shortid.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;

    // Si el usuario esta autenticado
    if (req.usuario) {
        const { password, descargas } = req.body;

        // Asignar a enlace el numero de descargas
        if (descargas) {
            enlace.descargas = descargas;
        }

        // Asignar un password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash(password, salt);
        }

        // Asignar el autor
        enlace.autor = req.usuario.id;
    }

    // Almacenar en la base de datos
    try {
        await enlace.save();
        return res.json({ message: `${enlace.url}` });
    } catch (error) {
        console.log(error);
    }
    console.log(req.body);
}

// Obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {
    const { url } = req.params;

    // Verificar si existe el enlace
    const enlace = await Enlace.findOne({ url });

    if (!enlace) {
        return res.status(400).json({ message: 'El enlace que estas buscando no existe.' });
    }

    // Si el enlace existe
    res.json({ archivo: enlace.nombre });

    next();
}

// Obtener todos los enlaces
exports.listadoEnlaces = async (req, res) => {
    try {
        const enlaces = await Enlace.find({}).select('url -_id');
        return res.json({ enlaces });
    } catch (error) {
        console.log(error);
    }
}
