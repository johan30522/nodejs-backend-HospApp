const { Router } = require('express');
const { check } = require('express-validator');
const { getLista, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuario.controller');
const { validaCampos } = require('../middlewares/validar-campos');
const router = Router();
const { validaJWT } = require('../middlewares/validar-jwt');


//rutas
router.get('/', validaJWT, getLista);
router.post('/', [
    check('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email ingresado no es valido'),
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe contener al menos 3 caracteres'),
    check('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña es mínimo de 6 caracteres'),
    validaCampos
], createUsuario);

router.put('/:id', [
    check('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email ingresado no es valido'),
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe contener al menos 3 caracteres'),
    check('role')
    .notEmpty().withMessage('El Rol es obligatorio'),
    validaCampos,
    validaJWT
], updateUsuario);

router.delete('/:id', validaJWT, deleteUsuario);




module.exports = router;