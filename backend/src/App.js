//Express
const express = require('express');
//Bodyparser
const bodyParser = require('body-parser');
//Path
const path = require('path')
//Morgan
const morgan = require('morgan')
//Ejecutando express
const App = express();

//Procesador de peticiones
App.use(morgan('dev'))
App.use(express.static(path.join(__dirname + "/Public")))

//Middleware Login
const AuthToken = require('./middlewares/AuthToken');
App.use(AuthToken);

//Manejador de json
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

//Rutas
const Product = require('./routes/product');
const User = require('./routes/user');
const Auth = require('./routes/auth');

App.use('/product', Product);
App.use('/user', User);
App.use('/auth', Auth);

//manejador de errores
/* App.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname + "/Public/Error/404.html"));
}); */

module.exports = App;