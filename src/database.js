var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:30017/Veterinaria', {useNewUrlParser: true,useUnifiedTopology:true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('base de datos conectada')
});


module.exports = mongoose;