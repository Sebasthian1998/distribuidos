'use strict'

var OrdenVenta = require('../models/ordenVenta');
//var fs = require('fs');
//var path = require('path');

var controller = {

    nuevoOrdenVenta: function(req, res){
        var orden_venta = new OrdenVenta();

        var params = req.body;
        orden_venta.numero_venta = params.numero_venta;
        orden_venta.empleado = params.empleado;
        orden_venta.cliente = params.cliente;
        orden_venta.descripcion = params.descripcion;
        orden_venta.fecha = params.fecha;
        orden_venta.producto = params.producto;
        orden_venta.total = params.total;
        //orden_venta.image = null;

        orden_venta.save((err, orden_ventaStored) => {

            if(err) {
                if(!orden_ventaStored) return res.status(404).send({message: 'No se ha podido guardar la orden de venta.'});
                return res.status(500).send({message: 'Error al guardar el documento.'});
            }

            return res.status(200).send({orden_venta: orden_ventaStored});
        });

        /*
        return res.status(200).send({
            orden_venta: orden_venta,
            message: "Método saveOrdenVenta"
        });
        */
    },

    buscarOrdenVenta: function(req, res){
        var orden_ventaId = req.params.id;

        if(orden_ventaId == null) return res.status(404).send({message: 'La orden de venta no existe'});

        OrdenVenta.findById(orden_ventaId, (err, orden_venta) => {

            if(err) {
                if(!orden_venta) return res.status(404).send({message: 'La orden de venta no existe.'});
                return res.status(500).send({message: 'Error al devolver los datos.'});
            }

            return res.status(200).send({
                orden_venta
            });

        }).populate('empleado').populate('cliente').populate('producto');
    },

    listarOrdenVentas: function(req, res){

        OrdenVenta.find({}).populate('empleado').populate('cliente').populate('producto').exec((err, ordenes_ventas) => {

            if(err){
                if(!ordenes_ventas) return res.status(404).send({message: 'No hay ordenes de ventas que mostrar.'});
                return res.status(500).send({message: 'Error al devolver los datos.'});
            } 

            return res.status(200).send({ordenes_ventas});
        });

    },

    editarOrdenVenta: function(req, res){
        var orden_ventaId = req.params.id;
        var update = req.body;

        OrdenVenta.findByIdAndUpdate(orden_ventaId, update, {new:true}, (err, orden_ventaUpdated) => {
            
            if(err){
                if(!orden_ventaUpdated) return res.status(404).send({message: 'No existe la orden de venta para actualizar'});
                return res.status(500).send({message: 'Error al actualizar'});
            } 

            return res.status(200).send({
                orden_venta: orden_ventaUpdated 
            });

        });

    },

    borrarOrdenVenta: function(req, res){
        var orden_ventaId = req.params.id;

        OrdenVenta.findByIdAndRemove(orden_ventaId, (err, orden_ventaRemoved) => {

            if(err){
                if(!orden_ventaRemoved) return res.status(404).send({message: "No se puede eliminar esa orden de venta porque no se encuentra."});
                return res.status(500).send({message: 'No se ha podido borrar la orden de venta'});
            } 

            return res.status(200).send({
                orden_venta: orden_ventaRemoved
            });
        });
    }

    /*
    uploadImage: function(req, res){
        var orden_ventaId = req.params.id;
        var fileName = 'Imagen no subida...';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt == 'gif'){
                
                OrdenVenta.findByIdAndUpdate(orden_ventaId, {image: fileName}, {new:true}, (err, orden_ventaUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
    
                    if(!orden_ventaUpdated) return res.status(404).send({message: 'El orden_venta no existe y no se ha asignado la imagen'});
    
                    return res.status(200).send({
                        orden_venta: orden_ventaUpdated
                    });
                });

            }else{

                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'La extensión no es válida'});
                });

            }

        }else{
            return res.status(200).send({
                message: fileName
            })
        }
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file))
            }else{
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        });
    }
    */

};

module.exports = controller;