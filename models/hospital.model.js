//const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const hospitalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: ''
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' });
hospitalSchema.method('toJSON', function() {
    const { __V, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})
module.exports = mongoose.model('Hospital', hospitalSchema);