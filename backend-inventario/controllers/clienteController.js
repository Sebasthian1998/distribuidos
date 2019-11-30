'use strict'

var Cliente = require('../models/cliente');
//var fs = require('fs');
//var path = require('path');

var controller = {

    nuevoCliente: function(req, res){
        var cliente = new Cliente();

        var params = req.body;
        cliente.nombres = params.nombres;
        cliente.apellidos = params.apellidos;
        cliente.direccion = params.direccion;
        cliente.telefono = params.telefono;
        cliente.celular = params.celular;
        cliente.email = params.email;
        //cliente.image = null;

        cliente.save((err, clienteStored) => {

            if(err){
                if(!clienteStored) return res.status(404).send({message: 'No se ha podido guardar el cliente.'});
                return res.status(500).send({message: 'Error al guardar el documento.'});
            } 

            return res.status(200).send({cliente: clienteStored});
        });

        /*
        return res.status(200).send({
            cliente: cliente,
            message: "Método saveCliente"
        });
        */
    },

    buscarCliente: function(req, res){
        var clienteId = req.params.id;

        if(clienteId == null) return res.status(404).send({message: 'El cliente no existe'});

        Cliente.findById(clienteId, (err, cliente) => {

            if(err){
                if(!cliente) return res.status(404).send({message: 'El cliente no existe.'});
                return res.status(500).send({message: 'Error al devolver los datos.'});
            } 

            return res.status(200).send({
                cliente
            });

        });
    },

    listarClientes: function(req, res){

        Cliente.find({}).exec((err, clientes) => {

            if(err){
                if(!clientees) return res.status(404).send({message: 'No hay clientes que mostrar.'});
                return res.status(500).send({message: 'Error al devolver los datos.'});
            } 

            return res.status(200).send({clientes});
        });

    },

    editarCliente: function(req, res){
        var clienteId = req.params.id;
        var update = req.body;

        Cliente.findByIdAndUpdate(clienteId, update, {new:true}, (err, clienteUpdated) => {

            if(err){
                if(!clienteUpdated) return res.status(404).send({message: 'No existe el cliente para actualizar'});
                return res.status(500).send({message: 'Error al actualizar'});
            } 

            return res.status(200).send({
               cliente: clienteUpdated 
            });

        });

    },

    borrarCliente: function(req, res){
        var clienteId = req.params.id;

        Cliente.findByIdAndRemove(clienteId, (err, clienteRemoved) => {
            
            if(err){
                if(!clienteRemoved) return res.status(404).send({message: "No se puede eliminar ese cliente porque no se encuentra."});
                return res.status(500).send({message: 'No se ha podido borrar el cliente'});
            } 

            return res.status(200).send({
                cliente: clienteRemoved
            });
        });
    }

    /*
    uploadImage: function(req, res){
        var clienteId = req.params.id;
        var fileName = 'Imagen no subida...';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt == 'gif'){
                
                Cliente.findByIdAndUpdate(clienteId, {image: fileName}, {new:true}, (err, clienteUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
    
                    if(!clienteUpdated) return res.status(404).send({message: 'El cliente no existe y no se ha asignado la imagen'});
    
                    return res.status(200).send({
                        cliente: clienteUpdated
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