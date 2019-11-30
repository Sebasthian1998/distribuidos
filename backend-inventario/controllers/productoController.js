'use strict'

var Producto = require('../models/producto');
//var fs = require('fs');
//var path = require('path');

var controller = {

    nuevoProducto: function(req, res){
        var producto = new Producto();

        var params = req.body;
        producto.nombre = params.nombre;
        producto.descripcion = params.descripcion;
        producto.stock = params.stock;
        producto.precio = params.precio;
        //producto.image = null;

        producto.save((err, productoStored) => {

            if(err){
                if(!productoStored) return res.status(404).send({message: 'No se ha podido guardar el producto.'});
                return res.status(500).send({message: 'Error al guardar el documento.'});
            } 

            return res.status(200).send({producto: productoStored});
        });

        /*
        return res.status(200).send({
            producto: producto,
            message: "Método saveProducto"
        });
        */
    },

    buscarProducto: function(req, res){
        var productoId = req.params.id;

        if(productoId == null) return res.status(404).send({message: 'El producto no existe'});

        Producto.findById(productoId, (err, producto) => {

            if(err){
                if(!producto) return res.status(404).send({message: 'El producto no existe.'});
                return res.status(500).send({message: 'Error al devolver los datos.'});
            } 

            return res.status(200).send({
                producto
            });

        });
    },

    listarProductos: function(req, res){

        Producto.find({}).exec((err, productos) => {

            if(err){
                if(!productos) return res.status(404).send({message: 'No hay productos que mostrar.'});
                return res.status(500).send({message: 'Error al devolver los datos.'});
            } 

            return res.status(200).send({productos});
        });

    },

    editarProducto: function(req, res){
        var productoId = req.params.id;
        var update = req.body;

        Producto.findByIdAndUpdate(productoId, update, {new:true}, (err, productoUpdated) => {

            if(err){
                if(!productoUpdated) return res.status(404).send({message: 'No existe el producto para actualizar'});
                return res.status(500).send({message: 'Error al actualizar'});
            } 

            return res.status(200).send({
               producto: productoUpdated 
            });

        });

    },

    borrarProducto: function(req, res){
        var productoId = req.params.id;

        Producto.findByIdAndRemove(productoId, (err, productoRemoved) => {

            if(err){
                if(!productoRemoved) return res.status(404).send({message: "No se puede eliminar ese producto porque no se encuentra."});
                return res.status(500).send({message: 'No se ha podido borrar el producto'});
            } 

            return res.status(200).send({
                producto: productoRemoved
            });
        });
    }

    /*
    uploadImage: function(req, res){
        var productoId = req.params.id;
        var fileName = 'Imagen no subida...';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt == 'gif'){
                
                Producto.findByIdAndUpdate(productoId, {image: fileName}, {new:true}, (err, productoUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
    
                    if(!productoUpdated) return res.status(404).send({message: 'El producto no existe y no se ha asignado la imagen'});
    
                    return res.status(200).send({
                        producto: productoUpdated
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