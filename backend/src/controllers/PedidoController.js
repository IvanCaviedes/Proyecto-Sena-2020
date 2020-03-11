//Base de Datos Collection Productos
const Pedido = require('../models/Pedido');

//Busca todos los productos
function index(req,res){
    Pedido.find({})
        .then(pedidos => {
            if(pedidos.length) return res.status(200).send({pedidos});
            return res.status(204).send({message: 'NO CONTENT'});
        }).catch(error => res.status(500).send({error}));
}
//Muestra uno en especifico
function show(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.pedidos) return res.status(404).send({message: 'NOT FOUND'});
    let pedidos = req.body.pedidos;
    return res.status(200).send({pedidos});
    
}
//Crea un producto
function create(req,res){
    mensaje = "usuario creado correctamente"
    new Pedido(req.body).save().then(pedido => res.status(201).send({mensaje,pedido})).catch(error => res.status(500).send({error}));
}
//Actualiza un producto
function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.pedidos) return res.status(404).send({message: 'NOT FOUND'});
    let pedido = req.body.pedidos[0];
    pedido = Object.assign(pedido,req.body);
    pedido.save().then(pedido => res.status(200).send({message: "UPDATED", pedido})).catch(error => res.status(500).send({error}));
}
//Elimina un producto
function remove(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.pedidos) return res.status(404).send({message: 'NOT FOUND'});
    req.body.pedidos[0].remove().then(pedido => res.status(200).send({message: 'REMOVED', pedido})).catch(error => res.status(500).send({error}));
}

// Busca un producto en especifico
function find(req,res,next){
    let query = {};
    query[req.params.key] = req.params.value;
    Pedido.find(query).then(pedidos => {
        if(!pedidos.length) return next();
        req.body.pedidos = pedidos;
        return next();
    }).catch(error =>{
        req.body.error = error;
        next();
    })
}
function prueba(req,res,next){
console.log(req.body)
}

module.exports = {
    index,
    show,
    create,
    update,
    remove,
    find,
    prueba
}