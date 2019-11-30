// ------------------------------ Dependencias ------------------------------ //

const jwt = require('jsonwebtoken');

// ------------------------------ JWT ( Verifica Tokens ) ------------------------------ //

let verificaToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('No estás autorizado1');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token == 'null') {
        return res.status(401).send('No estás autorizado2');
    }
    try {
        let payload = jwt.verify(token, global.gConfig.jwt_code);
        if (!payload)
            return res.status(401).send('No estás autorizado3')
        req.usuario = payload.subject;
        next();
    } catch (error) {
        return res.status(401).send('No estás autorizado3');
    }
}

module.exports = {
    verificaToken
}