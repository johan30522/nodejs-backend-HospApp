const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { validaJWT } = require('../middlewares/validar-jwt');
const { search, getCollection } = require('../controllers/search.controller')

//rutas
router.get('/:termino', [
    validaJWT
], search);


router.get('/coleccion/:tabla/:termino', [
    validaJWT
], getCollection);





module.exports = router;