const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    nombreComprador: {
        type: String,
        unique: true,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    productos: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,      
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

const Pedido = mongoose.model('Pedido',PedidoSchema);

module.exports = Pedido;