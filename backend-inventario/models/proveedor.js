const mongoose = require('mongoose');

let Schema = mongoose.Schema;

var proveedorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es necesaria']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es necesario']
    },
    celular: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario']
    }
});

module.exports = mongoose.model('Proveedor', proveedorSchema);
