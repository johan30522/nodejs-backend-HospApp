const { response, request } = require('express');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');



const search = async(req = request, res = response) => {

    let termino = req.params.termino;
    console.log(termino);

    const regexpr = new RegExp(termino, 'i');



    /*let usuarios = await Usuario.find({

        name: regexpr
    })
    let hospitales = await Hospital.find({

        name: regexpr
    })
    let medicos = await Medico.find({

        name: regexpr
    })*/

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({

            name: regexpr
        }),
        Hospital.find({

            name: regexpr
        }),
        Medico.find({

            name: regexpr
        })

    ])

    return res.status(200).json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    })




}

const getCollection = async(req = request, res = response) => {

    let termino = req.params.termino;
    let tabla = req.params.tabla;
    const regexpr = new RegExp(termino, 'i');
    let results = [];

    console.log(termino);
    console.log(tabla);



    switch (tabla) {
        case 'medicos':
            results = await Medico.find({
                name: regexpr
            });
            break;
        case 'hospitales':
            results = await Hospital.find({
                name: regexpr
            });
            break;
        case 'usuarios':
            results = await Usuario.find({
                name: regexpr
            });

            break;

        default:
            res.status(400).json({
                ok: false,
                msg: 'la tabla debe ser usuarios, medicos,hospitales'
            })
            break;
    }

    res.json({
        ok: true,
        results
    })
}


module.exports = {
    search,
    getCollection
}