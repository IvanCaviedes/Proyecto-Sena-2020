const express = require('express');
const MascotasCtrl = require('../controllers/MascotasController');

const Router = express.Router();

Router.get('/',MascotasCtrl.index) // api.com/product/ Index: Listar todos los productos
      .post('/register',MascotasCtrl.create)   // api.com/product/ Create: Crear un nuevo producto
      .get('/:key/:value',MascotasCtrl.find,MascotasCtrl.show)    // api.com/product/category/Hogar Show: Muestra un producto en específico
      .put('/:key/:value',MascotasCtrl.find,MascotasCtrl.update)    // api.com/product/name/SamsungGalaxy Update: Actualizar un producto en especifico
      .delete('/:key/:value',MascotasCtrl.find,MascotasCtrl.remove);// api.com/product/name/SamsungGalaxy

module.exports = Router;