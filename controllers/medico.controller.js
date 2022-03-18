const { response, request } = require('express');
const Medico = require('../models/medico.model');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');


const createMedico = async(req = request, res = response) => {
    const { name } = req.body;
    let uid = req.uid;
    try {
        console.log('llego aca!!!');
        let medicoDb = new Medico({
            usuario: uid,
            name: req.body.name,
            hospital: req.body.hospital
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
    console.log(`El id es ${uid}`);
    console.log(req.body);

    try {


        let medico = await Medico.findById(uid);
        if (!medico) {

            return res.status(400).json({
                ok: false,
                msj: 'el hospital no existe.'
            })
        }


        //verifica si el email que se esta actualizanbdo ya existe en la base e datos

        let { name } = req.body;

        console.log(name);

        let medicoUpdated = await Medico.findByIdAndUpdate(uid, { name }, { new: true });


        return res.status(200).json({
                ok: true,
                msj: 'Medico Actualizado',
                hospital: medicoUpdated
            })
            //generar respuesta exitosa

    } catch (error) {
        console.log('Error');
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

        //verifica que no exista el correo

        let medico = await Hospital.findById(uid);
        if (!medico) {

            return res.status(400).json({
                ok: false,
                msj: 'el hospital no existe.'
            })
        }

        await Medico.findOneAndDelete(uid);

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

    /* const medicos = await Medico.find({}, 'name usuario img')
         .populate('usuario', 'name email img')
         .populate('hospital', 'name email img');*/

    const desde = Number(req.query.desde || 0);

    const [medicos, total] = await Promise.all([
        Medico.find({}, 'name usuario img')
        .populate('usuario', 'name email img')
        .populate('hospital', 'name email img')
        .skip(desde)
        .limit(5),
        Medico.count()
    ])


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