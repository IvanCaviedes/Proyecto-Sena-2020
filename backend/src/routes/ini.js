const express = require('express');
const ProductCtrl = require('../controllers/iniControllerss');

const Router = express.Router();

Router.get('/', ProductCtrl.index)

module.exports = Router;