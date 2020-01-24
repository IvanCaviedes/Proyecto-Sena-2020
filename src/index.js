const express =  require('express');
const app = express();
// hola
require('./database');
//confugurando el puerto
app.set('port',process.env.PORT || 3000);
//iniciando servidor
app.listen(app.get('port'),()=>{
    console.log('El servidor esta corriendo en: ', app.get('port'));
});