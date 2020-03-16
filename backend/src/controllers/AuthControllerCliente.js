//Base de Datos collection Usuario
const User = require('../models/Cliente');
//Bcryp
const bcrypt = require('bcrypt');
//Config
const CONFIG = require('../config/config');
//Jsonwebtoken
const jwt = require('jsonwebtoken');

//Datos necesarios

//       Username
//       Password

function login(req,res){
    let username = req.body.username;
    let password = req.body.password;

    //Busca si existe
    User.findOne({username})
        .then(user => {
            if(!user) return res.status(404).send({message: 'EL USUARIO NO EXISTE'});
            //Si existe
            bcrypt.compare(password,user.password)
            //si es la contraseña correcta
                  .then(match => {
                        if(match){
                            payload = {
                                username: user.username,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                                id:user._id
                            }
                            //Acceso
                            //Crea token secreto
                            jwt.sign(payload,CONFIG.SECRET_TOKEN,{ expiresIn: '24h'},function(error,token){
                                if(error){
                                    res.status(500).send({error});
                                }else{
                                    //Envia el token y los datos del usuario
                                    res.status(200).send({message: 'Acceso',token,payload});
                                }
                            })
                        }else{
                            //No doy Acceso
                            res.status(200).send({message: 'PASSWORD INCORRECTA'});
                        }
                  }).catch(error => {
                    console.log(error);
                    res.status(500).send({error});
                  });
        }).catch(error => {
            console.log(error);
            res.status(500).send({error});
        });
}

module.exports = login;