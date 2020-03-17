//Base de Datos Collection clientes
const Clientescrud = require('../models/Clientescrud');

//Busca todos los clientes
function index(req,res){
    Clientescrud.find({})
        .then(Clientescruds => {
            if(Clientescruds.length) return res.status(200).send({Clientescruds});
            return res.send({message: 'NO CONTENT'});
        }).catch(error => res.send({error}));
}
//Muesta uno en especifico
function show(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.Clientescruds) return res.status(404).send({message: 'NOT FOUND'});
    let Clientescruds = req.body.Clientescruds;
    return res.status(200).send({Clientescruds});
    
}
//Crea un Clientes
function create(req,res){
    mensaje = "Cliente creado correctamente"
    new Proveedor(req.body).save().then(Clientescrud => res.status(201).send({mensaje,Clientescrud})).catch(error => res.status(500).send({error}));
}
//Actualiza un Clientes
function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.Clientescruds) return res.status(404).send({message: 'NOT FOUND'});
    let Clientescrud = req.body.Clientescruds[0];
    Clientescrud = Object.assign(Clientescrud,req.body);
    Clientescrud.save().then(Clientescrud => res.status(200).send({message: "UPDATED", Clientescrud})).catch(error => res.status(500).send({error}));
}
//Elimina un clientes
function remove(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.Clientescruds) return res.status(404).send({message: 'NOT FOUND'});
    req.body.Clientescruds[0].remove().then(Clientescrud => res.status(200).send({message: 'REMOVED', Clientescrud})).catch(error => res.status(500).send({error}));
}

// Busca un Proveedor en especifico
function find(req,res,next){
    let query = {};
    query[req.params.key] = req.params.value;
    Clientescrud.find(query).then(Clientescruds => {
        if(!Clientescruds.length) return next();
        req.body.Clientescruds = Clientescruds;
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