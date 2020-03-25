const Cotizacion = require('../models/cotizacion');
function index(req,res){
var suma =0;
Cotizacion.find({estado:'vendido'})
.then(cotizaciones=>{
    if (cotizaciones.length){
        for (let index = 0; index < cotizaciones.length; index++) {
            if (cotizaciones[index].Tventa === undefined) {
                
            }
            else{
                suma+=parseInt(cotizaciones[index].Tventa, 10);
            }
            
        }
        res.send({ suma});
    }
    else{
        return res.send({ message: 'NO CONTENT' });
    }

})
}

module.exports = {
    index
}