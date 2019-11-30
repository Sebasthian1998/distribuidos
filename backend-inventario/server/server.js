const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const app = express()

// ------------------------------ VARIABLES DE ENTORNO ------------------------------ //
process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'testing';
// process.env.NODE_ENV = 'production';
const mongoose = require('mongoose');
const config = require('../config/config');

// ------------------------------ RUTAS ------------------------------ //
const rutas = require('../routes/rutas');

// ------------------------------ MIDDLEWARES ------------------------------ //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ------------------------------ CARPETA PÚBLICA ------------------------------ //
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/DenunciaAntisoborno/', express.static(path.join(__dirname, './dist/QuipucamayocSDA')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-KEY, Origin, X-Requested-With, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/inventario/api/v1', rutas);

mongoose.connect(global.gConfig.database, { useNewUrlParser: true, useFindAndModify: false }, (err, res) => {
    if (err) throw err;
    console.log("BD Online!");
});

app.listen(global.gConfig.node_port, () => {
    console.log("Escuchando el puerto: " + global.gConfig.node_port);
});