//Base de Datos Collection proveedores
const Proveedor = require('../models/cotizacion');
const Produ = require('../models/Product')

//Busca todos los proveedores
function index(req, res) {
    Proveedor.find({ estado: 'pendiente' })
        .then(Proveedores => {
            if (Proveedores.length) return res.status(200).send({ Proveedores });
            return res.send({ message: 'NO CONTENT' });
        }).catch(error => res.send({ error }));
}
//Muesta uno en especifico
function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.Proveedores) return res.send({ message: 'NOT FOUND' });
    let Proveedores = req.body.Proveedores;
    return res.status(200).send({ Proveedores });

}
//Crea un Proveedor
function create(req, res) {
    mensaje = "mascota creada correctamente"
    new Proveedor(req.body).save().then(Proveedor => res.status(201).send({ mensaje, Proveedor })).catch(error => res.status(500).send({ error }));
}
//Actualiza un Proveedor
function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.Proveedores) return res.status(404).send({ message: 'NOT FOUND' });
    let Proveedor = req.body.Proveedores[0];
    Proveedor = Object.assign(Proveedor, req.body);
    Proveedor.save().then(Proveedor => res.status(200).send({ message: "UPDATED", Proveedor })).catch(error => res.status(500).send({ error }));
}
//Elimina un Proveedor
function remove(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.Proveedores) return res.status(404).send({ message: 'NOT FOUND' });
    req.body.Proveedores[0].remove().then(Proveedor => res.status(200).send({ message: 'REMOVED', Proveedor })).catch(error => res.status(500).send({ error }));
}

// Busca un Proveedor en especifico
function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value;
    Proveedor.find(query).then(Proveedores => {
        if (!Proveedores.length) return next();
        req.body.Proveedores = Proveedores;
        return next();
    }).catch(error => {
        req.body.error = error;
        next();
    })
}
function aceptada(req, res) {
    try {
        const { idcotizacion } = req.body
        Proveedor.find({ _id: idcotizacion })
            .then(cot => {
                const productos = JSON.parse(cot[0].productos)
                for (let index = 0; index < productos.length; index++) {
                    const idproducto = productos[index].id
                    Produ.find({ _id: idproducto })
                        .then(pro => {
                            if (productos[index].cantidad > pro[0].stock) {
                                res.send({ mensaje: 'no se pudo hacer la actualizacion' })
                            }
                            else {
                                var myquery = { _id: idproducto };
                                var newstock = pro[0].stock - productos[index].cantidad
                                var newvalues = { $set: { stock: newstock } };
                                Produ.updateOne(myquery, newvalues)
                                    .catch(e => {
                                        res.send({ mensaje: e })
                                    })

                            }
                        })
                }
                var myquery = { _id: idcotizacion };
                var newvalues = { $set: { estado: 'vendido', Idcliente: `${cot[0].Idcliente}/vendido` } };
                Proveedor.updateOne(myquery, newvalues)
                    .then(e => {
                        console.log(e)
                    })
                    .catch(e => {
                        res.send({ mensaje: e })
                    })
            })

            res.send({mensaje:'actualizado'})
    }
    catch(e){
        res.send({mensaje:e})
    }

}

module.exports = {
    index,
    show,
    create,
    update,
    remove,
    find,
    aceptada
}