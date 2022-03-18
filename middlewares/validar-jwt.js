const { response, request } = require('express');

const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario.model')

const validaJWT = (req = request, res = response, next) => {

    const token = req.header('x-token');
    console.log('Token que llega', token);


    if (!token) {

        return res.status(401).json({
            ok: false,
            msj: 'error en el token.'
        })
    }

    try {
        const { payload } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        console.log('token valido');
        req.uid = payload.uid;
        req.name = payload.name;
        req.email = payload.email;

    } catch (error) {

        return res.status(401).json({
            ok: false,
            msj: 'token no valido'
        })
    }




    next();
};

const validarAdmionRole = async (req = request, res = response, next) => {


    const uid = req.uid;
    console.log('uid', uid);



    try {

        const usuario = await Usuario.findById(uid);
        if (usuario) {
            console.log(usuario);
            if (usuario.role !== 'ADMIN_ROLE') {
                return res.status(403).json({
                    ok: false,
                    msj: 'usuario no es Admin'
                })
            }
            next();
        } else {
            return res.status(401).json({
                ok: false,
                msj: 'usuario no existe'
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'hable con el Administrador'
        })
    }
}

const validarAdmionRole_SameUser = async (req = request, res = response, next) => {


    const uid = req.uid;
    const uidModificar = req.params.id;
    console.log('uid', uid);
    console.log('uidModificar', uidModificar);



    try {

        const usuario = await Usuario.findById(uid);
        if (usuario) {
            console.log(usuario);
            //Se verifica si es administrador o es el mimso usuario que intenta modificar su isnformacion
            if (usuario.role === 'ADMIN_ROLE' || uid === uidModificar) {
                next();
            } else {
                return res.status(403).json({
                    ok: false,
                    msj: 'usuario no es Admin'
                })
            }

        } else {
            return res.status(401).json({
                ok: false,
                msj: 'usuario no existe'
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'hable con el Administrador'
        })
    }
}


module.exports = {
    validaJWT,
    validarAdmionRole,
    validarAdmionRole_SameUser
}