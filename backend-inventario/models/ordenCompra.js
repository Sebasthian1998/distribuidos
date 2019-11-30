const mongoose = require('mongoose');

let Schema = mongoose.Schema;

mongoose.model('Empleado');
mongoose.model('Proveedor');
mongoose.model('Producto');

var ordenCompraSchema = Schema({
    numero_compra: {
        type: String,
        required: true
    },
    empleado: { 
        type: Schema.ObjectId, 
        ref: "Empleado",
        required: true 
    },
    proveedor: { 
        type: Schema.ObjectId, 
        ref: "Proveedor" ,
        required: true
    },
    descripcion: String,
    fecha: {
        type: String,
        require: true,
    },
    producto: { 
        type: Schema.ObjectId, 
        ref: "Producto" 
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('OrdenCompra', ordenCompraSchema);
