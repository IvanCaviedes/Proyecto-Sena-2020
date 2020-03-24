//Base de Datos Collection Productos
const Product = require('../models/Product');
const fs = require('fs-extra');
const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: 'dblz919ee',
    api_key: '252643212149885',
    api_secret: 'EqbXG4_EDcleLGkbatSEaaxda_A'
})

//Busca todos los productos
function index(req, res) {
    Product.find({})
        .then(products => {
            if (products.length) return res.status(200).send({ products });
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(error => res.status(500).send({ error }));
}
//cinco
function cinco(req, res) {
    Product.find({}).limit(5)
        .then(products => {
            if (products.length) return res.status(200).send({ products });
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(error => res.status(500).send({ error }));
}
//Muesta uno en especifico
function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.products) return res.status(404).send({ message: 'NOT FOUND' });
    let products = req.body.products;
    return res.status(200).send({ products });

}
//Crea un producto
async function create(req, res) {
    const { name, stock, price, category, proveedor } = req.body
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    mensaje = "producto creado correctamente"
    new Product({ name: name, stock: stock, price: price, category: category, imageUrl: result.url,proveedor:proveedor }).save()
        .then(product => { return res.send({ mensaje: 'registrado' }) })
        .catch(error => res.send({ error: 'no registrado' }));
    await fs.unlink(req.file.path)
}
//Actualiza un producto
function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.products) return res.status(404).send({ message: 'NOT FOUND' });
    let product = req.body.products[0];
    product = Object.assign(product, req.body);
    product.save().then(product => res.status(200).send({ message: "UPDATED", product })).catch(error => res.status(500).send({ error }));
}
//Elimina un producto
function remove(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.products) return res.status(404).send({ message: 'NOT FOUND' });
    req.body.products[0].remove().then(product => res.status(200).send({ message: 'REMOVED', product })).catch(error => res.status(500).send({ error }));
}

// Busca un producto en especifico
function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value;
    Product.find(query).then(products => {
        if (!products.length) return next();
        req.body.products = products;
        return next();
    }).catch(error => {
        req.body.error = error;
        next();
    })
}
function prueba(req, res, next) {
    console.log(req.body)
}

module.exports = {
    index,
    cinco,
    show,
    create,
    update,
    remove,
    find,
    prueba
}