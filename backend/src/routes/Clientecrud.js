const express = require('express');
const CcrudCtrl = require('../controllers/ClientecrudController');
const verificar = require('../middlewares/autentication')

const Router = express.Router();

Router.get('/',CcrudCtrl.index) // api.com/product/ Index: Listar todos los productos
      .post('/register',CcrudCtrl.create)   // api.com/product/ Create: Crear un nuevo producto
      .get('/:key/:value',CcrudCtrl.find,CcrudCtrl.show)    // api.com/product/category/Hogar Show: Muestra un producto en específico
      .put('/:key/:value',CcrudCtrl.find,CcrudCtrl.update)    // api.com/product/name/SamsungGalaxy Update: Actualizar un producto en especifico
      .delete('/:key/:value',CcrudCtrl.find,CcrudCtrl.remove);// api.com/product/name/SamsungGalaxy

module.exports = Router;