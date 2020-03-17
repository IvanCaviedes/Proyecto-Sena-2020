const mongoose = require('mongoose');

const CotizacionShema = new mongoose.Schema({
    Idcliente:{
        type:String,
        required:true
    },
    productos: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

const Pedido = mongoose.model('cotizacion',CotizacionShema);

module.exports = Pedido;