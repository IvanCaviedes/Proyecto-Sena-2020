//Express
const express = require('express');
//Cors 
const cors = require('cors');
//BodyParser
const bodyParser = require('body-parser')
//Path
const path = require('path')
//Morgan
const morgan = require('morgan')
//Multer
const multer = require('multer');
//Handlebar
const exphbs = require('express-handlebars')

//Ejecutando express
const App = express();

//Procesador de peticiones

//templates
App.set('views', path.join(__dirname, 'views'));
App.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(App.get('views'), 'layouts'),
    partialsDir: path.join(App.get('views'), 'partials'),
    extname: '.hbs'
}))
App.set('view engine', '.hbs');
//morgan
App.use(morgan('dev'))
//multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})
App.use(multer({ storage }).single('image'))

//Archivos estaticos
App.use('/public',express.static(path.join(__dirname,'./public')))

//Middleware Login
const AuthToken = require('./middlewares/AuthToken');
App.use(AuthToken);

//Manejador de json

App.use(bodyParser.json());

App.use(bodyParser.urlencoded({
    extended: false
}));

App.use(cors());

//Rutas
const Product = require('./routes/product');
const User = require('./routes/user');
const Auth = require('./routes/auth');
const correos = require('./routes/correos')
const categoria = require('./routes/categoria')
const mascotas = require('./routes/mascotas')
const proveedor = require('./routes/proveedor')
const productos = require('./routes/productos')
const prueba = require('./routes/prueba')

App.use('/product', Product);
App.use('/user', User);
App.use('/auth', Auth);
App.use('/correos', correos);
App.use('/categoria',categoria);
App.use('/mascotas',mascotas);
App.use('/proveedor',proveedor)

App.use('/imagenes',prueba)

App.use('/index',(req,res)=>{
    res.render('index')
})

App.use('/noticias', (req, res) => {
    res.render('noticias')
})
App.use('/cuidados', (req, res) => {
    res.render('cuidados')
})
App.use('/prueba', (req, res) => {
    res.render('prueba')
})

App.use('/productos', productos.control.index)

//manejador de errores
/* App.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname + "/Public/Error/404.html"));
}); */

module.exports = App;