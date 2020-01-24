const express =  require('express');
const app = express();
const path = require('path');
// Coneccion con base de datos
require('./database');
//confugurando el puerto
app.set('port',process.env.PORT || 3000);
//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));;
//iniciando servidor
app.listen(app.get('port'),()=>{
    console.log('El servidor esta corriendo en: ', app.get('port'));
});