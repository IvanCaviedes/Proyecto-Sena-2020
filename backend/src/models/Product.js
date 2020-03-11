const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 10
    },
    date: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: String,
        required:true,
        enum: [
            'Alimentos',
            'Juguetes',
            'Medicamentos',
            'Accesorios'
        ]
    },
    imageUrl:{
        type:String,
        require:true,
        unique:true
    },
});

const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;