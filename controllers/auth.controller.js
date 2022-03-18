const { response, request } = require('express');
//const { Usuario } = require('../models/user');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const { googleVerify } = require('../helpers/google-verify');
const { getMenu } = require('../helpers/menu-frontEnd');


const loginUsuario = async (req = request, res = response) => {

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
        console.log(usuarioDb.role);
        return res.status(200).json({
            ok: true,
            msj: 'usuario autenticado',
            uid: usuarioDb.id,
            name: usuarioDb.name,
            email: usuarioDb.email,
            token,
            menu: getMenu(usuarioDb.role)
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'debe comunicar al administrador'
        })
    }



}


const loginGoogle = async (req = request, res = response) => {


    try {
        const { token } = req.body;

        const { email, name, picture } = await googleVerify(token);

        let usuarioDb = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDb) {
            usuario = new Usuario({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDb;
            usuario.google = true;
            usuario.password = '@@@';
        }
        await usuario.save();
        usuarioDb = await Usuario.findOne({ email });
        console.log(usuarioDb);

        //generar json web token
        const tokenAuth = await generarJWT(usuario.id, usuario.name);

        let menu = getMenu(usuarioDb.role);
        console.log(menu);
        return res.status(200).json({
            ok: true,
            msj: 'usuario google autenticado',
            email,
            name,
            picture,
            token: tokenAuth,
            menu
        })
    } catch (error) {
        console.log('error');
        console.log(error);
        return res.status(401).json({
            ok: false,
            msj: 'token incorrecto'
        })
    }



}


const renewUsuario = async (req = request, res = response) => {

    const { uid, name, email } = req;

    //leer la base de datos
    let usuarioDb = await Usuario.findById(uid);
    if (!usuarioDb) {
        return res.status(400).json({
            ok: false,
            msj: 'el usuario no existe.'
        })
    }

    console.log(usuarioDb);
    //generar json web token
    const token = await generarJWT(uid, name);


    //console.log(token);
    return res.status(200).json({
        ok: true,
        msj: 'renew de usuarios',
        usuario: usuarioDb,
        token,
        menu: getMenu(usuarioDb.role)
    })

}

module.exports = {
    loginUsuario,
    renewUsuario,
    loginGoogle
}