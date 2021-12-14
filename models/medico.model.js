//const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const medicoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: ''
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
}, { collection: 'medicos' });
medicoSchema.method('toJSON', function() {
    const { __V, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})
module.exports = mongoose.model('Medico', medicoSchema);