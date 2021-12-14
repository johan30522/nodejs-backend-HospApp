const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { validaJWT } = require('../middlewares/validar-jwt');
const { uploadFile, returnImage } = require('../controllers/upload.controller')

const expressFileUpload = require('express-fileupload');

router.use(expressFileUpload());

router.put('/:tabla/:id', [
    validaJWT
], uploadFile);
router.get('/:tabla/:image', returnImage);


module.exports = router;