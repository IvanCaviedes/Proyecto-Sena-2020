const User = require('../models/User');

function prueba(req,res,next){
    const {username} = req.body
    User.findOne({username})
    .then(user =>{

        console.log(user.password)
    })
}

module.exports = {
    prueba
}