//const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: String,
        default: false
    }
});
UsuarioSchema.method('toJSON', function() {
    const { __V, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})
module.exports = mongoose.model('Usuario', UsuarioSchema);