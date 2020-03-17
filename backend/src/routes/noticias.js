const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');
const control = {}


control.index = async (req, res) => {
     const $ = await request({
        uri: 'https://www.eltiempo.com/noticias/mascotas',
        transform: body => cheerio.load(body)
    });
    const web = $('.title');
    console.log(web.html());
    res.render('noticias')
   
}
    
module.exports = { control }

 