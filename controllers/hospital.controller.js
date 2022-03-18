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



        let hospital = await Hospital.findById(uid);
        if (!hospital) {

            return res.status(400).json({
                ok: false,
                msj: 'el hospital no existe.'
            })
        }


        //verifica si el email que se esta actualizanbdo ya existe en la base e datos

        let { name } = req.body;

        console.log(name);

        let hospitalUpdated = await Hospital.findByIdAndUpdate(uid, { name }, { new: true });


        return res.status(200).json({
                ok: true,
                msj: 'Hospital Actualizado',
                hospital: hospitalUpdated
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


        //verifica que no exista el correo

        let hospital = await Hospital.findById(uid);
        if (!hospital) {

            return res.status(400).json({
                ok: false,
                msj: 'el hospital no existe.'
            })
        }

        await Hospital.findOneAndDelete(uid);

        return res.status(200).json({
                ok: true,
                msj: 'Hospital Eliminado'
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

    const desde = Number(req.query.desde || 0);


    /*
        const hospitals = await Hospital.find({}, 'name usuario')
            .populate('usuario', 'name email img');

    */


    const [hospitals, total] = await Promise.all([
        Hospital.find({}, 'name usuario img')
        .populate('usuario', 'name email img')
        .skip(desde)
        .limit(5),
        Hospital.count()
    ])

    //console.log(token);
    return res.status(200).json({
        ok: true,
        total,
        hospitals
    })



}

const getListaTodo = async(req = request, res = response) => {

    const desde = Number(req.query.desde || 0);


    const [hospitals, total] = await Promise.all([
        Hospital.find({}, 'name usuario img')
        .populate('usuario', 'name email img'),
        Hospital.count()
    ])

    //console.log(token);
    return res.status(200).json({
        ok: true,
        total,
        hospitals
    })

}



module.exports = {
    getLista,
    createHospital,
    updateHospital,
    deleteHospital,
    getListaTodo
}