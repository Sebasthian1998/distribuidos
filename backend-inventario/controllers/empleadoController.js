const controller = {};
const jwt = require('jsonwebtoken')
const Empleado = require('../models/empleado')
const bcrypt = require('bcrypt')
var fs = require('fs');
var path = require('path');

controller.nuevoEmpleado = async(request, response) => {

    let body = response.req.body;
    console.log(body)

    let empleado = new Empleado({
        nombres: body.nombres,
        apellidos: body.apellidos,
        email: body.correo,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        img: body.img,
        edad: body.edad,
        direccion: body.direccion,
        estado: body.estado
    })

    await empleado.save((err, empleadoDB) => {
        if (err) {
            response.status(400).json({
                ok: false,
                err
            });
        } else {
            empleadoDB.password = "";
            console.log(empleadoDB);
            response.json({
                ok: true,
                empleado: empleadoDB
            })
        }
    });
}

controller.buscarEmpleado =  async(req, res) => {
    var empleadoId = req.params.id;

    if(empleadoId == null) return res.status(404).send({message: 'El empleado no existe'});

    await Empleado.findById(empleadoId, (err, empleado) => {

        if(err){
            if(!empleado) return res.status(404).send({message: 'El empleado no existe.'});
            return res.status(500).send({message: 'Error al devolver los datos.'});
        } 

        return res.status(200).send({
            empleado
        });

    });
}

controller.listarEmpleados = async(request, response) => {
    await Empleado.find({}).exec((err, listaUsuarios) => {
        if (err) {
            return resizeBy.status(400).json({
                ok: false,
                err
            })
        } else {
            response.json({
                ok: true,
                listaUsuarios
            })
        }
    })

}

controller.editarEmpleado = async(request, response) => {
    let id = request.params.id;
    let body = request.body;

    await Empleado.findOneAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return resizeBy.status(400).json({
                ok: false,
                err
            })
        } else {
            response.json({
                ok: true,
                id
            });
        }

    });
}

controller.borrarEmpleado = async(request, response) => {

    let id = request.params.id;
    let body = request.body;

    await Empleado.findByIdAndRemove(id, (err, usuarioDB) => {
        if (err) {
            return resizeBy.status(400).json({
                ok: false,
                err
            })
        } else {
            response.json({
                ok: true,
                id
            });
        }

    });
}

controller.uploadImage = async(req, res) => {
    var empleadoId = req.params.id;
    var fileName = 'Imagen no subida...';

    if(req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[1];
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if(fileExt == 'png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt == 'gif'){
            
            Empleado.findByIdAndUpdate(empleadoId, {img: fileName}, {new:true}, (err, empleadoUpdated) => {
                
                if(err){
                    if(!empleadoUpdated) return res.status(404).send({message: 'El empleado no existe y no se ha asignado la imagen'});
                    return res.status(500).send({message: 'La imagen no se ha subido'});
                } 

                return res.status(200).send({
                    empleado: empleadoUpdated
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
}

controller.getImageFile = async(req, res) => {
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

module.exports = controller;