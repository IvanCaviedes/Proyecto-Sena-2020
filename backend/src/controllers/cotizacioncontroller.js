//Base de Datos Collection proveedores
const Proveedor = require('../models/cotizacion');
const Produ = require('../models/Product')
const Cliente = require('../models/Cliente')
var nodemailer = require('nodemailer');
const moment =require('moment')

//Busca todos los proveedores
function index(req, res) {
    Proveedor.find({ estado: 'pendiente' })
        .then(Proveedores => {
            if (Proveedores.length) return res.status(200).send({ Proveedores });
            return res.send({ message: 'NO CONTENT' });
        }).catch(error => res.send({ error }));
}
function index2(req, res) {
    Proveedor.find({})
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
    const {Tventa} = req.body;
    mensaje = "mascota creada correctamente"
    new Proveedor(req.body).save()
    .then(Proveedor => {
        res.send({ mensaje, Proveedor })
        console.log(Proveedor.Idcliente)
        Cliente.find({_id:Proveedor.Idcliente})
        .then(us=>{
            var correo = us[0].email
            var transporter = nodemailer.createTransport({
                host: "smtp-mail.outlook.com", // hostname
                secureConnection: false, // TLS requires secureConnection to be false
                port: 587, // port for secure SMTP
                tls: {
                    ciphers: 'SSLv3'
                },
                auth: {
                    user: 'ivancaviedes99@outlook.com',
                    pass: '99120900389ivan'
                }
            });
            var mailOptions = {
                from: 'ivancaviedes99@outlook.com',
                to: correo,
                subject: 'Cotizacion exitosa',
               html:`<h1>Cotizacion exitosa y el precio a pagar es $${Tventa}</h1><img src="https://cdn.discordapp.com/attachments/580223884276793345/691831204575707136/Mascotas.jpg" alt="" />`
            };



            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).send(req.body)
                } else {
                    console.log('Email enviado')
                    res.send({mensaje:'Correo enviado'})
                }
            });
        })
    }).catch(error => res.status(500).send({ error }));
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

};

function comprovarDias (req,res){
    Proveedor.find({estado: 'pendiente'})
    .then(users => {
        for (let index = 0; index < users.length; index++) {
            var base = users[index].date
            var consultar = moment(base).format()
            const diferencia = moment().diff(consultar,'days')
            console.log(diferencia)
            if (diferencia > 2) {
                var myquery = { _id: users[index]._id };
                Proveedor.deleteOne(myquery)
                .catch(e=>res.send({e}))
            }
        }
        return res.send({ mensaje: 'Ventas Actualizadas' });
    })
    .catch(e=>res.send({e}))
}

module.exports = {
    index,
    index2,
    show,
    create,
    update,
    remove,
    find,
    aceptada,
    comprovarDias
}