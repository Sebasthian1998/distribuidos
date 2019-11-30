const controller = {};
const jwt = require('jsonwebtoken');
const Empleado = require('../models/empleado');
const bcrypt = require('bcrypt')

controller.login = async(req, res) => {

    let body = res.req.body;
    console.log(body);

    Empleado.findOne({
        email: body.correo
    }, (err, empleadoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        } else {
            if (!empleadoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: '(Usuario) o contraseña incorrectos'
                    }
                })
            } else {
                
                    let token = jwt.sign({
                        empleadoDB
                    }, global.gConfig.jwt_code, { expiresIn: 60 * 60 });

                    return res.status(200).send({ token, empleadoDB });
                
            }
        }
    })
}

controller.logout = async(req, res) => {

}

controller.getNombreReniec = async(req, res) => {

}

module.exports = controller;