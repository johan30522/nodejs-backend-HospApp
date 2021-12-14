const { Router } = require('express');
const { check } = require('express-validator');

const { validaCampos } = require('../middlewares/validar-campos');
const router = Router();
const { validaJWT } = require('../middlewares/validar-jwt');
const { getLista, createMedico, deleteMedico, updateMedico } = require('../controllers/medico.controller')

//rutas
router.get('/', [
    validaJWT
], getLista);

router.post('/', [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe contener al menos 3 caracteres'),
    check('idHospital', 'El hospital debe de ser valido').isMongoId(),

    validaCampos,
    validaJWT
], createMedico);

router.put('/:id', [validaJWT], updateMedico);

router.delete('/:id', [validaJWT], deleteMedico);




module.exports = router;