const express = require('express');
const app = express();
const path = require('path')
const morgan = require('morgan')
// Coneccion con base de datos
require('./database');
//confugurando el puerto
app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname + "/Public")))


app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname + "/Public/Error/404.html"));
});

//iniciando servidor
app.listen(app.get('port'), () => {
    console.log('El servidor esta corriendo en: ', app.get('port'));
});