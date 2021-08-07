const Usuario = require("../models/Usuario")
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.autenticarUsuario = async (req, res, next) => {
    // Revisar si hay errores

    // Buscar el usuario para ver si esta registrado
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        return res.status(401).json({ message: 'El usuario no existe' });
    }

    console.log(`usuario`, usuario);
    // Verificar el password y autenticar el usuario
}
exports.usuarioAutenticado = async (req, res) => {

}