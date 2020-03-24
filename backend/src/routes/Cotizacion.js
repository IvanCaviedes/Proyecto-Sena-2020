const express = require('express');
const ProductCtrl = require('../controllers/cotizacioncontroller');

const Router = express.Router();

Router.get('/',ProductCtrl.index)
      .post('/create',ProductCtrl.create)
      .post('/aceptada',ProductCtrl.aceptada)
      .get('/:key/:value',ProductCtrl.find,ProductCtrl.show) 
      .delete('/:key/:value',ProductCtrl.find,ProductCtrl.remove)

      module.exports = Router;