//Base de Datos Collection Productos
const Product = require('../models/Product');

//Busca todos los productos
function index(req,res){
    Product.find({})
        .then(products => {
            if(products.length) return res.status(200).send({products});
            return res.status(204).send({message: 'NO CONTENT'});
        }).catch(error => res.status(500).send({error}));
}
//Muesta uno en especifico
function show(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.products) return res.status(404).send({message: 'NOT FOUND'});
    let products = req.body.products;
    return res.status(200).send({products});
    
}
//Crea un producto
function create(req,res){
    mensaje = "usuario creado correctamente"
    new Product(req.body).save().then(product => res.status(201).send({mensaje,product})).catch(error => res.status(500).send({error}));
}
//Actualiza un producto
function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.products) return res.status(404).send({message: 'NOT FOUND'});
    let product = req.body.products[0];
    product = Object.assign(product,req.body);
    product.save().then(product => res.status(200).send({message: "UPDATED", product})).catch(error => res.status(500).send({error}));
}
//Elimina un producto
function remove(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.products) return res.status(404).send({message: 'NOT FOUND'});
    req.body.products[0].remove().then(product => res.status(200).send({message: 'REMOVED', product})).catch(error => res.status(500).send({error}));
}

// Busca un producto en especifico
function find(req,res,next){
    let query = {};
    query[req.params.key] = req.params.value;
    Product.find(query).then(products => {
        if(!products.length) return next();
        req.body.products = products;
        return next();
    }).catch(error =>{
        req.body.error = error;
        next();
    })
}

module.exports = {
    index,
    show,
    create,
    update,
    remove,
    find
}