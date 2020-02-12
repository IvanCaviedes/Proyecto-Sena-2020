//Express
const express = require('express');
//Cors 
const cors = require('cors')
//Path
const path = require('path')
//Morgan
const morgan = require('morgan')
//Ejecutando express
const App = express();

App.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//Procesador de peticiones
App.use(morgan('dev'))
App.use(express.static(path.join(__dirname + "/Public")))

//Middleware Login
const AuthToken = require('./middlewares/AuthToken');
App.use(AuthToken);

//Manejador de json
App.use(cors());
App.use(express.json());

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