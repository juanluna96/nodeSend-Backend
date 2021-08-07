const Usuario = require("../models/Usuario")
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.autenticarUsuario = async (req, res, next) => {
    // Revisar si hay errores

    // Buscar el usuario para ver si esta registrado
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        return res.status(401).json({ message: 'El usuario no existe' });
    }

    // Verificar el password y autenticar el usuario
    if (bcrypt.compareSync(password, usuario.password)) {
        // Crear JWT
    } else {
        return res.status(401).json({ message: 'Password incorrecto' });
    }

}
exports.usuarioAutenticado = async (req, res) => {

}