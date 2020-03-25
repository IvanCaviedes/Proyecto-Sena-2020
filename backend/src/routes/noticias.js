const cheerio = require('cheerio');
const fetch = require('node-fetch')
const request = require('request-promise');
const control = {}


control.index = async (req, res) => {
    try {
        const $ = await request({
            uri: 'https://www.eltiempo.com/noticias/mascotas',
            transform: body => cheerio.load(body,{ decodeEntities: false })
        });
        const datos = [];
        const objeto = {};
        $('.image-top').each((i, el) => {
            const imagenes = $(el).find('.image-container a').children('img').eq(0).attr('data-original')
            const azul = $(el).find('.category')
            const fecha = $(el).find('.published-at')
            const titulo = $(el).find('.title')
            datos.push({ 
                "imagenes"    : `https://www.eltiempo.com/${imagenes}`,
                "ciudad"  : azul.text(),
                "fecha"    : fecha.text(),
                "titulo" : titulo.text()
            });
        })
        objeto.datos = datos;
        console.log(objeto)
        res.render('noticias',{objeto})
   
    } catch (e) {
        console.log(e);
    }
    
}

control.perros =  (req, res) => {
    try {
        res.render('ideal')
   
    } catch (e) {
        console.log(e);
    }
}

control.ideal = async (req, res,e) => {
    try {
        var d = ''
        fetch('https://dog.ceo/api/breeds/image/random')
        .then(prro =>{
           if(prro.ok){
               return prro.json();
           }
        })
        .then(p =>{
            const convertido = p.message
            res.render('ideal',{convertido})
        })
    } catch (e) {
        console.log(e);
    }
}
    
module.exports = { control }
