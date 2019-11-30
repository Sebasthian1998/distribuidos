const mongoose = require('mongoose');

let Schema = mongoose.Schema;

mongoose.model('Empleado');
mongoose.model('Cliente');
mongoose.model('Producto');

var ordenVentaSchema = Schema({
    numero_venta: {
        type: String,
        required: true
    },
    empleado: { 
        type: Schema.ObjectId, 
        ref: "Empleado",
        required: true 
    },
    cliente: { 
        type: Schema.ObjectId, 
        ref: "Cliente" ,
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
module.exports = mongoose.model('OrdenVenta', ordenVentaSchema);
