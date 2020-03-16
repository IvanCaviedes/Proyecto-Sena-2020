const express = require('express');
const AuthCtrl = require('../controllers/AuthController');
const AuthCliente = require('../controllers/AuthControllerCliente');
const Router = express.Router();

Router.post('/login',AuthCtrl)
.post('/loginCliente',AuthCliente)

module.exports = Router;