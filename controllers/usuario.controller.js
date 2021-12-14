const { response, request } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');


const createUsuario = async(req = request, res = response) => {

    const { email, name, password } = req.body;
    console.log(req.body);

    try {

        //verifica que no exista el correo

        let usuario = await Usuario.findOne({ email });
        if (usuario) {

            return res.status(400).json({
                ok: false,
                msj: 'el usuario ya existe.'
            })
        }

        let usuarioDb = new Usuario(req.body);
        //encripta la contrasenna
        const salt = bcrypt.genSaltSync();
        usuarioDb.password = bcrypt.hashSync(password, salt);


        //generar json web token
        const token = await generarJWT(usuarioDb.id, name);

        //guardar el usuario en base de datos
        await usuarioDb.save();
        // se retorna las credenciales
        return res.status(200).json({
                ok: true,
                msj: 'usuario creado',
                uid: usuarioDb.id,
                name: usuarioDb.name,
                email: usuarioDb.email,
                token
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

const updateUsuario = async(req = request, res = response) => {

    let uid = req.params.id;
    console.log(req.body);

    try {

        //verifica que no exista el correo

        let usuario = await Usuario.findById(uid);
        if (!usuario) {

            return res.status(400).json({
                ok: false,
                msj: 'el usuario no existe.'
            })
        }


        //verifica si el email que se esta actualizanbdo ya existe en la base e datos
        let { password, google, email, ...campos } = req.body;

        if (usuario.email !== email) {

            let existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msj: 'ya existe un usuario con ese email.'
                })
            }
        }


        campos.email = email;

        delete campos.role;
        delete campos.email;


        let userUpdated = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        return res.status(200).json({
                ok: true,
                msj: 'Usuario Actualizado',
                usuario: userUpdated,
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

const deleteUsuario = async(req = request, res = response) => {

    let uid = req.params.id;
    console.log(req.body);

    try {

        //verifica que no exista el correo

        let usuario = await Usuario.findById(uid);
        if (!usuario) {

            return res.status(400).json({
                ok: false,
                msj: 'el usuario no existe.'
            })
        }

        await Usuario.findOneAndDelete(uid);

        return res.status(200).json({
                ok: true,
                msj: 'Usuario Eliminado'
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


    /* const usuarios = await Usuario.find({}, 'name email role google')
         .skip(desde)
         .limit(2);
     const total = await Usuario.count();*/

    //console.log(token);

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'name email role google')
        .skip(desde)
        .limit(2),
        Usuario.count()
    ])
    return res.status(200).json({
        ok: true,
        total,
        usuarios: usuarios
    })




}


module.exports = {
    getLista,
    createUsuario,
    updateUsuario,
    deleteUsuario
}