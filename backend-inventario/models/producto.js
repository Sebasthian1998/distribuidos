const mongoose = require('mongoose');

let Schema = mongoose.Schema;

var productoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria']
    },
    stock: {
        type: Number,
        required: [true, 'Falta colocar el stock']
    },
    precio: {
        type: Number,
        required: [true, 'Falta colocar el precio']
    }
});

module.exports = mongoose.model('Producto', productoSchema);