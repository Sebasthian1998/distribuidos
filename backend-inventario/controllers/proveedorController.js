'use strict'

var Proveedor = require('../models/proveedor');
//var fs = require('fs');
//var path = require('path');

var controller = {

    nuevoProveedor: function(req, res){
        var proveedor = new Proveedor();

        var params = req.body;
        proveedor.nombre = params.nombre;
        proveedor.direccion = params.direccion;
        proveedor.telefono = params.telefono;
        proveedor.celular = params.celular;
        proveedor.email = params.email;
        //proveedor.image = null;

        proveedor.save((err, proveedorStored) => {

            if(err){
                if(!proveedorStored) return res.status(404).send({message: 'No se ha podido guardar el proveedor.'});
                return res.status(500).send({message: 'Error al guardar el documento.'});
            } 

            return res.status(200).send({proveedor: proveedorStored});
        });

        /*
        return res.status(200).send({
            proveedor: proveedor,
            message: "Método saveProveedor"
        });
        */
    },

    buscarProveedor: function(req, res){
        var proveedorId = req.params.id;

        if(proveedorId == null) return res.status(404).send({message: 'El proveedor no existe'});

        Proveedor.findById(proveedorId, (err, proveedor) => {

            if(err){
                if(!proveedor) return res.status(404).send({message: 'El proveedor no existe.'});
                return res.status(500).send({message: 'Error al devolver los datos.'});
            } 

            return res.status(200).send({
                proveedor
            });

        });
    },

    listarProveedores: function(req, res){

        Proveedor.find({}).exec((err, proveedores) => {

            if(err){
                if(!proveedores) return res.status(404).send({message: 'No hay proveedores que mostrar.'});
                return res.status(500).send({message: 'Error al devolver los datos.'});
            } 

            return res.status(200).send({proveedores});
        });

    },

    editarProveedor: function(req, res){
        var proveedorId = req.params.id;
        var update = req.body;

        Proveedor.findByIdAndUpdate(proveedorId, update, {new:true}, (err, proveedorUpdated) => {

            if(err){
                if(!proveedorUpdated) return res.status(404).send({message: 'No existe el proveedor para actualizar'});
                return res.status(500).send({message: 'Error al actualizar'});
            } 

            return res.status(200).send({
               proveedor: proveedorUpdated 
            });

        });

    },

    borrarProveedor: function(req, res){
        var proveedorId = req.params.id;

        Proveedor.findByIdAndRemove(proveedorId, (err, proveedorRemoved) => {

            if(err){
                if(!proveedorRemoved) return res.status(404).send({message: "No se puede eliminar ese proveedor porque no se encuentra."});
                return res.status(500).send({message: 'No se ha podido borrar el proveedor'});
            } 

            return res.status(200).send({
                proveedor: proveedorRemoved
            });
        });
    }

    /*
    uploadImage: function(req, res){
        var proveedorId = req.params.id;
        var fileName = 'Imagen no subida...';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt == 'gif'){
                
                Proveedor.findByIdAndUpdate(proveedorId, {image: fileName}, {new:true}, (err, proveedorUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
    
                    if(!proveedorUpdated) return res.status(404).send({message: 'El proveedor no existe y no se ha asignado la imagen'});
    
                    return res.status(200).send({
                        proveedor: proveedorUpdated
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