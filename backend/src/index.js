const Database = require('./config/database');
const CONFIG = require('./config/config');
const App = require('./App');

Database.connect();

//iniciando servidor
App.listen(CONFIG.PORT,function(error){
    if(error) return console.log(error);
    console.log(`Servidor corriendo en el Puerto: ${CONFIG.PORT}`);
});