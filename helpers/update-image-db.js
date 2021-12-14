const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');

const fs = require('fs');


const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        //borra imagen
        fs.unlinkSync(path);
    }
}
const updateImage = async(tabla, id, nombreArchivo) => {


    let itemDB = {};

    switch (tabla) {
        case 'medicos':
            itemDB = await Medico.findById(id);
            break;
        case 'hospitales':
            itemDB = await Hospital.findById(id);
            break;
        case 'usuarios':
            itemDB = await Usuario.findById(id);
            break;
        default:
            return false;
    }
    if (!itemDB) {
        return false;
    }
    if (itemDB.img !== '') {
        const pathViejo = `./uploads/${tabla}/${itemDB.img}`;
        borrarImagen(pathViejo);
    }
    itemDB.img = nombreArchivo;
    await itemDB.save();
    return true;
}


module.exports = {
    updateImage
}