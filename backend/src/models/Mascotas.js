const mongoose = require('mongoose');

const MascotasSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    especie: {
        type: String,
        required: true

    },
    raza: {
        type: String,
        required: true
    },
    nombrecliente: {
        type: String,
        required: true
    }
});

const Mascota = mongoose.model('Mascota',MascotasSchema);

module.exports = Mascota;