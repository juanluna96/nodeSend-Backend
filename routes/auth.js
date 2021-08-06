const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");

router.post("/",
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6 }),
    ],
    authController.autenticarUsuario
);

router.get("/", authController.usuarioAutenticado);


module.exports = router;