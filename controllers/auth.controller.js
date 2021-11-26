const { response, request } = require('express');
//const { Usuario } = require('../models/user');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const loginUsuario = async(req = request, res = response) => {

    try {

        const { email, password } = req.body;


        let usuarioDb = await Usuario.findOne({ email });
        if (!usuarioDb) {

            return res.status(400).json({
                ok: false,
                msj: 'el usuario no existe.'
            })
        }
        //Confirmar si el password hace match
        if (!bcrypt.compareSync(password, usuarioDb.password)) {

            return res.status(401).json({
                ok: false,
                msj: 'password incorrecto'
            })
        }
        //generar json web token
        const token = await generarJWT(usuarioDb.id, usuarioDb.name);

        return res.status(200).json({
            ok: true,
            msj: 'usuario autenticado',
            uid: usuarioDb.id,
            name: usuarioDb.name,
            email: usuarioDb.email,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'debe comunicar al administrador'
        })
    }



}

const renewUsuario = async(req = request, res = response) => {

    const { uid, name, email } = req;

    //leer la base de datos
    let usuarioDb = await Usuario.findById(uid);
    if (!usuarioDb) {
        return res.status(400).json({
            ok: false,
            msj: 'el usuario no existe.'
        })
    }


    //generar json web token
    const token = await generarJWT(uid, name);


    //console.log(token);
    return res.status(200).json({
        ok: true,
        msj: 'renew de usuarios',
        uid,
        name,
        email: usuarioDb.email,
        token
    })

}

module.exports = {
    loginUsuario,
    renewUsuario
}