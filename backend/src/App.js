const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path')
const morgan = require('morgan')

const App = express();

const Product = require('./routes/product');
const User = require('./routes/user');
const Auth = require('./routes/auth');

const AuthToken = require('./middlewares/AuthToken');


App.use(morgan('dev'))
App.use(express.static(path.join(__dirname + "/Public")))

App.use(AuthToken);


App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

/* App.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname + "/Public/Error/404.html"));
}); */


App.use('/product', Product);
App.use('/user', User);
App.use('/auth', Auth);


module.exports = App;