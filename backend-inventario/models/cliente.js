const mongoose = require('mongoose');

let Schema = mongoose.Schema;

var clienteSchema = Schema({
    nombres: {
        type: String,
        required: [true, 'Los nombres son necesarios']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son necesarios']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es necesaria']
    },
    telefono: {
        type: String
    },
    celular: {
        type: String
    },
    email: {
        type: String
    },
});

module.exports = mongoose.model('Cliente', clienteSchema);