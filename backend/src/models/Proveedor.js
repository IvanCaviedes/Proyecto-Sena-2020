const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    telefono: {
        type: String,
        required: true

    },
    correo: {
        type: String,
        required: true
    },
});

const Proveedor = mongoose.model('Proveedor',ProveedorSchema);

module.exports = Proveedor;