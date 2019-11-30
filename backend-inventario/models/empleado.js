const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let empleadoSchema = new Schema({
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
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        default: '',
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Empleado', empleadoSchema);