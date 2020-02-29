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
//cloudinary
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dblz919ee',
    api_key:'252643212149885',
    api_secret: 'EqbXG4_EDcleLGkbatSEaaxda_A'
})
//Ejecutando express
const App = express();

//Procesador de peticiones

//templates
App.set('views',path.join(__dirname,'views'));
App.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(App.get('views'),'layouts'),
    partialsDir: path.join(App.get('views'),'partials'),
    extname:'.hbs'
}))
App.set('view engine','.hbs');
//morgan
App.use(morgan('dev'))
//multer
const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/uploads'),
    filename:(req,file,cb)=>{
        cb(null,new Date().getTime() + path.extname(file.originalname))
    }
})
App.use(multer({storage}).single('image'))

//Middleware Login
const AuthToken = require('./middlewares/AuthToken');
App.use(AuthToken);


//middleware peticiones

App.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}) 
//Archivos estaticos
App.use('/public',express.static(path.join(__dirname,'./public')))
//Manejador de json

App.use(bodyParser.json());
App.use(cors());
App.use(bodyParser.urlencoded({
    extended: false
}));

//Rutas
const Product = require('./routes/product');
const User = require('./routes/user');
const Auth = require('./routes/auth');
const correos = require('./routes/correos')

App.use('/product', Product);
App.use('/user', User);
App.use('/auth', Auth);
App.use('/correos', correos);

App.use('/',(req,res)=>{
    res.render('navbar')
})



//manejador de errores
/* App.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname + "/Public/Error/404.html"));
}); */

module.exports = App;