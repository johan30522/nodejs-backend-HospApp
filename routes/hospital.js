const { Router } = require('express');
const { check } = require('express-validator');

const { validaCampos } = require('../middlewares/validar-campos');
const router = Router();
const { validaJWT } = require('../middlewares/validar-jwt');
const { createHospital, deleteHospital, getLista, updateHospital, getListaTodo } = require('../controllers/hospital.controller')

//rutas
router.get('/', [
    validaJWT
], getLista);

router.get('/todo', [
    validaJWT
], getListaTodo);

router.post('/', [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe contener al menos 3 caracteres'),
    validaCampos,
    validaJWT
], createHospital);

router.put('/:id', [
    validaJWT
], updateHospital);

router.delete('/:id', [validaJWT], deleteHospital);




module.exports = router;