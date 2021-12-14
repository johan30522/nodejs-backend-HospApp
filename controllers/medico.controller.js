const { response, request } = require('express');
const Medico = require('../models/medico.model');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');


const createMedico = async(req = request, res = response) => {
    const { name } = req.body;
    let uid = req.uid;
    try {

        let medicoDb = new Medico({
            usuario: uid,
            name: req.body.name,
            hospital: req.body.idHospital
        });
        //console.log(req);





        let medico = await medicoDb.save();

        return res.status(200).json({
                ok: true,
                msj: 'Medico creado',
                medico
            })
            //generar respuesta exitosa

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'debe comunicar al administrador'
        })
    }




}

const updateMedico = async(req = request, res = response) => {

    let uid = req.params.id;
    console.log(req.body);

    try {


        return res.status(200).json({
                ok: true,
                msj: 'Medico Actualizado',

            })
            //generar respuesta exitosa

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'debe comunicar al administrador'
        })
    }




}

const deleteMedico = async(req = request, res = response) => {

    let uid = req.params.id;
    console.log(req.body);

    try {

        return res.status(200).json({
                ok: true,
                msj: 'Medico Eliminado'
            })
            //generar respuesta exitosa

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'debe comunicar al administrador'
        })
    }




}


const getLista = async(req = request, res = response) => {




    const medicos = await Medico.find({}, 'name usuario')
        .populate('usuario', 'name email img')
        .populate('hospital', 'name email img');


    //console.log(token);
    return res.status(200).json({
        ok: true,
        medicos
    })




}


module.exports = {
    getLista,
    createMedico,
    updateMedico,
    deleteMedico
}