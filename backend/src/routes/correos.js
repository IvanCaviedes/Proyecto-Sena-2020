const express = require('express');
const correoCtrl = require('../controllers/CorreoController');

const Router = express.Router();

Router.post('/recuperar',correoCtrl.prueba)

module.exports = Router