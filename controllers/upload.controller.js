const { response, request } = require('express');
const path = require('path');
const fs = require('fs');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');

const { updateImage } = require('../helpers/update-image-db')

const { v4: uuidv4 } = require('uuid');



const uploadFile = async(req = request, res = response) => {

    let id = req.params.id;
    let tabla = req.params.tabla;

    let results = [];

    const tiposValidos = ['hospitales', 'medicos', 'usuarios']



    if (!tiposValidos.includes(tabla)) {
        res.status(400).json({
            ok: false,
            msg: 'la tabla debe ser usuarios, medicos,hospitales'
        })
    }
    // valida que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
    }

    //procesa la Imagen
    let file = req.files.imagen;
    let nameCortado = file.name.split('.');
    let extencion = nameCortado[nameCortado.length - 1];

    //valida extencion
    const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extencionesValidas.includes(extencion)) {
        return res.status(400).json({
            ok: false,
            msg: 'extencion no valida'
        });
    }
    // genera nel nombre del archivo
    let nombreArchivo = `${uuidv4()}.${extencion}`;

    //Arma elm path del archivo

    let path = `./uploads/${tabla}/${nombreArchivo}`;

    // Salva el archivo
    file.mv(path, function(err) {
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                msg: err
            });
        }
        return res.json({
            ok: true,
            nombreArchivo
        })
    });


    updateImage(tabla, id, nombreArchivo);


}


const returnImage = (req, res) => {

    const tabla = req.params.tabla;
    const image = req.params.image;

    const pathImg = path.join(__dirname, `../uploads/${tabla}/${image}`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        res.sendFile(path.join(__dirname, `../uploads/no-image-found.png`));
    }
}

module.exports = {
    uploadFile,
    returnImage
}