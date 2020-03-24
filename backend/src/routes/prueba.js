const express = require('express');
const Router = express.Router();
const User = require('../models/User');
const moment = require('moment')

Router.get('/', (req, res) => {
    User.find()
        .then(users => {
            if (users.length) {
                for (let index = 0; index < users.length; index++) {
                    const dia = moment()
                    const contultar = moment(users[index].sign_up_date)
                    const diferencia = dia.diff(contultar, 'days')
                    console.log(moment(dateFrom).subtract(1, 'months').format('YYYY-MM-DD'))
                    if (diferencia > 2) {
                        console.log('esta es la id del mayor ' + users[index]._id)
                    }
                }
                return res.status(200).send({ mensaje: 'Ventas Actualizadas' });
            } else {
                return res.send({ message: 'NO CONTENT' });
            }
        })
        .catch(e => res.status(500).send({ e }))
})

module.exports = Router;