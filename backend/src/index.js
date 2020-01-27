const express =  require('express');
const app = express();
// Coneccion con base de datos
require('./database');
//confugurando el puerto
app.set('port',process.env.PORT || 4000);

app.use(__dirname,'public')

//iniciando servidor
app.listen(app.get('port'),()=>{
    console.log('El servidor esta corriendo en: ', app.get('port'));
});