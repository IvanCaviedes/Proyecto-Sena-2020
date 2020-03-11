//Base de Datos Collection Productos
const categoria = require('../models/categoria');

//Busca todos los productos
function index(req,res){
    categoria.find({})
        .then(categoria => {
            if(categoria.length) {
              return res.status(200).send({categoria});  
            }
            else{
                return res.send({message: 'NO CONTENT'})
            }
        }).catch(error => res.send({error}));
}
//Muesta uno en especifico
function show(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.categoria) return res.status(404).send({message: 'NOT FOUND'});
    let categoria = req.body.categoria;
    return res.status(200).send({categoria});
    
}
//Crea un producto
function create(req,res){
    mensaje = "categoria creada correctamente"
    new categoria(req.body).save().then(product => res.send({mensaje})).catch(error => res.status(500).send({error}));
}
//Actualiza un producto
function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.categoria) return res.status(404).send({message: 'NOT FOUND'});
    let categoria = req.body.categoria[0];
    categoria = Object.assign(categoria,req.body);
    categoria.save().then(product => res.status(200).send({message: "UPDATED", product})).catch(error => res.status(500).send({error}));
}
//Elimina un producto
function remove(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.categoria) return res.status(404).send({message: 'NOT FOUND'});
    req.body.categoria[0].remove().then(product => res.status(200).send({message: 'REMOVED', product})).catch(error => res.status(500).send({error}));
}

// Busca un producto en especifico
function find(req,res,next){
    let query = {};
    query[req.params.key] = req.params.value;
    categoria.find(query).then(categoria => {
        if(!categoria.length) return next();
        req.body.categoria = categoria;
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