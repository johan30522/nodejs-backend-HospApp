const { response, request } = require('express');
const Hospital = require('../models/hospital.model');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');


const createHospital = async(req = request, res = response) => {
    const { name } = req.body;
    let uid = req.uid;

    try {

        let hospitalDb = new Hospital({
            usuario: uid,
            ...req.body
        });
        //console.log(req);





        let hospital = await hospitalDb.save();

        return res.status(200).json({
                ok: true,
                msj: 'hospital creado',
                hospital
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

const updateHospital = async(req = request, res = response) => {

    let uid = req.params.id;
    console.log(req.body);

    try {


        return res.status(200).json({
                ok: true,
                msj: 'Usuario Actualizado',

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

const deleteHospital = async(req = request, res = response) => {

    let uid = req.params.id;
    console.log(req.body);

    try {

        return res.status(200).json({
                ok: true,
                msj: 'hospital Eliminado'
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

    const hospitals = await Hospital.find({}, 'name usuario')
        .populate('usuario', 'name email img');




    //console.log(token);
    return res.status(200).json({
        ok: true,
        hospitals
    })



}


module.exports = {
    getLista,
    createHospital,
    updateHospital,
    deleteHospital
}