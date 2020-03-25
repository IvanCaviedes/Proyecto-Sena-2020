const express = require('express');
const UserCtrl = require('../controllers/VentasController');
const verificar = require('../middlewares/autentication')

const Router = express.Router();

Router.get('/',UserCtrl.index)
module.exports = Router;