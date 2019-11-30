'use strict'

var OrdenCompra = require('../models/ordenCompra');
//var fs = require('fs');
//var path = require('path');

var controller = {

    nuevoOrdenCompra: function(req, res){
        var orden_compra = new OrdenCompra();

        var params = req.body;
        orden_compra.numero_compra = params.numero_compra;
        orden_compra.empleado = params.empleado;
        orden_compra.proveedor = params.proveedor;
        orden_compra.descripcion = params.descripcion;
        orden_compra.fecha = params.fecha;
        orden_compra.producto = params.producto;
        orden_compra.total = params.total;
        //orden_compra.image = null;

        orden_compra.save((err, orden_compraStored) => {

            if(err) {
                if(!orden_compraStored) return res.status(404).send({message: 'No se ha podido guardar la orden de compra.'});
                return res.status(500).send({message: 'Error al guardar el documento.'});
            }

            return res.status(200).send({orden_compra: orden_compraStored});
        });

        /*
        return res.status(200).send({
            orden_compra: orden_compra,
            message: "Método saveOrdenCompra"
        });
        */
    },

    buscarOrdenCompra: function(req, res){
        var orden_compraId = req.params.id;

        if(orden_compraId == null) return res.status(404).send({message: 'La orden de compra no existe'});

        OrdenCompra.findById(orden_compraId, (err, orden_compra) => {

            if(err) {
                if(!orden_compra) return res.status(404).send({message: 'La orden de compra no existe.'});
                return res.status(500).send({message: 'Error al devolver los datos.'});
            }

            return res.status(200).send({
                orden_compra
            });

        }).populate('empleado').populate('proveedor').populate('producto');
    },

    listarOrdenCompras: function(req, res){

        OrdenCompra.find({}).populate('empleado').populate('proveedor').populate('producto').exec((err, ordenes_compras) => {

            if(err){
                if(!ordenes_compras) return res.status(404).send({message: 'No hay ordenes de compras que mostrar.'});
                return res.status(500).send({message: 'Error al devolver los datos.'});
            } 

            return res.status(200).send({ordenes_compras});
        });

    },

    editarOrdenCompra: function(req, res){
        var orden_compraId = req.params.id;
        var update = req.body;

        OrdenCompra.findByIdAndUpdate(orden_compraId, update, {new:true}, (err, orden_compraUpdated) => {
            
            if(err){
                if(!orden_compraUpdated) return res.status(404).send({message: 'No existe la orden de compra para actualizar'});
                return res.status(500).send({message: 'Error al actualizar'});
            } 

            return res.status(200).send({
                orden_compra: orden_compraUpdated 
            });

        });

    },

    borrarOrdenCompra: function(req, res){
        var orden_compraId = req.params.id;

        OrdenCompra.findByIdAndRemove(orden_compraId, (err, orden_compraRemoved) => {

            if(err){
                if(!orden_compraRemoved) return res.status(404).send({message: "No se puede eliminar esa orden de compra porque no se encuentra."});
                return res.status(500).send({message: 'No se ha podido borrar la orden de compra'});
            } 

            return res.status(200).send({
                orden_compra: orden_compraRemoved
            });
        });
    }

    /*
    uploadImage: function(req, res){
        var orden_compraId = req.params.id;
        var fileName = 'Imagen no subida...';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt == 'gif'){
                
                OrdenCompra.findByIdAndUpdate(orden_compraId, {image: fileName}, {new:true}, (err, orden_compraUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
    
                    if(!orden_compraUpdated) return res.status(404).send({message: 'El orden_compra no existe y no se ha asignado la imagen'});
    
                    return res.status(200).send({
                        orden_compra: orden_compraUpdated
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