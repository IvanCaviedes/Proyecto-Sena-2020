//Base de Datos Collection proveedores
const Proveedor = require('../models/Proveedor');

//Busca todos los proveedores
function index(req,res){
    Proveedor.find({})
        .then(Proveedores => {
            if(Proveedores.length) return res.status(200).send({Proveedores});
            return res.status(204).send({message: 'NO CONTENT'});
        }).catch(error => res.status(500).send({error}));
}
//Muesta uno en especifico
function show(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.Proveedores) return res.status(404).send({message: 'NOT FOUND'});
    let Proveedores = req.body.Proveedores;
    return res.status(200).send({Proveedores});
    
}
//Crea un Proveedor
function create(req,res){
    mensaje = "mascota creada correctamente"
    new Proveedor(req.body).save().then(Proveedor => res.status(201).send({mensaje,Proveedor})).catch(error => res.status(500).send({error}));
}
//Actualiza un Proveedor
function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.Proveedores) return res.status(404).send({message: 'NOT FOUND'});
    let Proveedor = req.body.Proveedores[0];
    Proveedor = Object.assign(Proveedor,req.body);
    Proveedor.save().then(Proveedor => res.status(200).send({message: "UPDATED", Proveedor})).catch(error => res.status(500).send({error}));
}
//Elimina un Proveedor
function remove(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.Proveedores) return res.status(404).send({message: 'NOT FOUND'});
    req.body.Proveedores[0].remove().then(Proveedor => res.status(200).send({message: 'REMOVED', Proveedor})).catch(error => res.status(500).send({error}));
}

// Busca un Proveedor en especifico
function find(req,res,next){
    let query = {};
    query[req.params.key] = req.params.value;
    Proveedor.find(query).then(Proveedores => {
        if(!Proveedores.length) return next();
        req.body.Proveedores = Proveedores;
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