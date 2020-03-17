const User = require('../models/User');
const User2 = require('../models/Cliente');
var nodemailer = require('nodemailer');

function prueba(req,res,next){
    const {username} = req.body
    User.findOne({username})
    .then(user =>{
        const password = user.password

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
            to: user.email,
            subject: 'Recuperacion de cuenta PetShop',
            text: `Este es tu codigo para restablecer tu contraseña  ${password}  por favor ingresa a la pagina para hacer el cambio de contraseña http://localhost:3000/recuperar`
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
}
function prueba2(req,res,next){
    const {username} = req.body
    User2.findOne({username})
    .then(user =>{
        const password = user.password

        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            secureConnection: false, 
            port: 587,
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
            to: user.email,
            subject: 'Recuperacion de cuenta PetShop',
            text: `Este es tu codigo para restablecer tu contraseña  ${password}  por favor ingresa a la pagina para hacer el cambio de contraseña http://localhost:3000/recuperar`
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
}

function nuevo (req,res,next){
    const {username,email,name}=req.body

    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: process.env.CORREO,
            pass: process.env.PASS
        }
    });

    var mailOptions = {
        from: 'ivancaviedes99@outlook.com',
        to: 'ivancaviedes99@gmail.com',
        subject: 'Creacion Usuario PetShop',
        text: `Un usuario solicito la creacion de una cuenta sus datos son  nombre:${name}, correo: ${email}, username:${username}`
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
}

module.exports = {
    prueba,
    nuevo,
    prueba2
}