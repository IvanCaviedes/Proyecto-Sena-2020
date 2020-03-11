//Base de Datos Collection Mascotasos
const Mascotas = require('../models/Mascotas');

//Busca todos los Mascotasos
function index(req,res){
    Mascotas.find({})
        .then(Mascotass => {
            if(Mascotass.length) return res.status(200).send({Mascotass});
            return res.status(204).send({message: 'NO CONTENT'});
        }).catch(error => res.status(500).send({error}));
}
//Muesta uno en especifico
function show(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.Mascotass) return res.status(404).send({message: 'NOT FOUND'});
    let Mascotass = req.body.Mascotass;
    return res.status(200).send({Mascotass});
    
}
//Crea un Mascotaso
function create(req,res){
    mensaje = "mascota creada correctamente"
    new Mascotas(req.body).save().then(Mascotas => res.status(201).send({mensaje,Mascotas})).catch(error => res.status(500).send({error}));
}
//Actualiza un Mascotaso
function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.Mascotass) return res.status(404).send({message: 'NOT FOUND'});
    let Mascotas = req.body.Mascotass[0];
    Mascotas = Object.assign(Mascotas,req.body);
    Mascotas.save().then(Mascotas => res.status(200).send({message: "UPDATED", Mascotas})).catch(error => res.status(500).send({error}));
}
//Elimina un Mascotaso
function remove(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.Mascotass) return res.status(404).send({message: 'NOT FOUND'});
    req.body.Mascotass[0].remove().then(Mascotas => res.status(200).send({message: 'REMOVED', Mascotas})).catch(error => res.status(500).send({error}));
}

// Busca un Mascotaso en especifico
function find(req,res,next){
    let query = {};
    query[req.params.key] = req.params.value;
    Mascotas.find(query).then(Mascotass => {
        if(!Mascotass.length) return next();
        req.body.Mascotass = Mascotass;
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