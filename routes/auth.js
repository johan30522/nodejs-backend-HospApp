const { Router } = require('express');
const { check } = require('express-validator');
const { loginUsuario, renewUsuario } = require('../controllers/auth.controller');
const { validaCampos } = require('../middlewares/validar-campos');
const router = Router();
const { validaJWT } = require('../middlewares/validar-jwt');




//login de usuario 
router.post('/', [
        //validaciones
        check('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Email ingresado no es valido'),
        check('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña es mínimo de 6 caracteres'),
        validaCampos
    ],
    loginUsuario);
//validar y revalidar token
router.get('/renew', validaJWT, renewUsuario)



module.exports = router;