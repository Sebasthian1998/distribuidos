// DEPENDENCIA
const _ = require('lodash');
// IMPORT DE LOS MODULOS
const config = require('./config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);
// DECLARANDO LA VARIABLE GLOBAL
global.gConfig = finalConfig;
// CONSOLA DE MENSAJE DE AMBIENTE
console.log("Corriendo en el ambiente de: " + global.gConfig.config_id);