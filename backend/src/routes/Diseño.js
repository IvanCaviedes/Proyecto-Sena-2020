const express = require('express')
const Router = express.Router();

const ControlDiseño = require('../controllers/Diseñocontroller')
Router.get('/',ControlDiseño.index)