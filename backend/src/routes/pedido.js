const express = require('express');
const PedidoCtrl = require('../controllers/PedidoController');

const Router = express.Router();

Router.get('/',PedidoCtrl.index) // api.com/product/ Index: Listar todos los productos
      .post('/create',PedidoCtrl.create)   // api.com/product/ Create: Crear un nuevo producto
      .post('/prueba',PedidoCtrl.prueba)
      .get('/:key/:value',PedidoCtrl.find,PedidoCtrl.show)    // api.com/product/category/Hogar Show: Muestra un producto en específico
      .put('/:key/:value',PedidoCtrl.find,PedidoCtrl.update)    // api.com/product/name/SamsungGalaxy Update: Actualizar un producto en especifico
      .delete('/:key/:value',PedidoCtrl.find,PedidoCtrl.remove) // api.com/product/name/SamsungGalaxy

      module.exports = Router;