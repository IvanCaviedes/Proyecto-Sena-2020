//Database
const Database = require('./config/database');
//Variables de entorno
require('dotenv').config()
//Configuracion
const CONFIG = require('./config/config');
//App
const App = require('./App');
App.use('/',(req,res)=>{
    res.render('index')
})
//conectar con base de datos
App.use('/',(req,res)=>{
    res.render('index')
})
Database.connect();
//iniciando servidor
App.listen(CONFIG.PORT,function(error){
    if(error) return console.log(error);
    console.log(`Servidor corriendo en el Puerto: ${CONFIG.PORT}`);
});
