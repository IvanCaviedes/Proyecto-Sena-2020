var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb://localhost:30017/Veterinaria'?'mongodb://localhost:30017/Veterinaria':`mongodb+srv://${process.env.NOMBREUSUARIO}:${process.env.PASSWORDBD}@cluster0-c6bxx.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('base de datos conectada')
});
module.exports = mongoose;