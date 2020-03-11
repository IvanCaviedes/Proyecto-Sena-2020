const express = require('express');

const ProveedorCtrl = require('../controllers/ProveedorController');

const Router = express.Router();

Router.get('/',ProveedorCtrl.index) // api.com/product/ Index: Listar todos los productos
      .post('/register',ProveedorCtrl.create)   // api.com/product/ Create: Crear un nuevo producto
      .get('/:key/:value',ProveedorCtrl.find,ProveedorCtrl.show)    // api.com/product/category/Hogar Show: Muestra un producto en específico
      .put('/:key/:value',ProveedorCtrl.find,ProveedorCtrl.update)    // api.com/product/name/SamsungGalaxy Update: Actualizar un producto en especifico
      .delete('/:key/:value',ProveedorCtrl.find,ProveedorCtrl.remove);// api.com/product/name/SamsungGalaxy

module.exports = Router;