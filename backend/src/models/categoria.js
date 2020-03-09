const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    }
});

const categoria = mongoose.model('categoria',CategoriaSchema);

module.exports = categoria;