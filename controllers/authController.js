const Usuario = require("../models/Usuario")
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: 'variables.env' });

exports.autenticarUsuario = async (req, res, next) => {
    // Revisar si hay errores
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    // Buscar el usuario para ver si esta registrado
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        return res.status(401).json({ message: 'El usuario no existe' });
    }

    // Verificar el password y autenticar el usuario
    if (bcrypt.compareSync(password, usuario.password)) {
        // Crear JWT
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        }, process.env.SECRETA, {
            expiresIn: '8h'
        });

        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Password incorrecto' });
    }

}
exports.usuarioAutenticado = async (req, res) => {

}