const control = {}
const Product = require('../models/Product');

control.index = async (req, res) => {
    const datos = await Product.find();
    res.render('productos', {datos})
}

module.exports = { control }

