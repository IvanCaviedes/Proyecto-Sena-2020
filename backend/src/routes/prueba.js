const express = require('express');
const Router = express.Router();
const request = require('request-promise');
const cheerio = require('cheerio');

Router.get('/', async (req, res) => {
    try {
        const $ = await request({
            uri: 'https://www.eltiempo.com/noticias/mascotas',
            transform: body => cheerio.load(body,{ decodeEntities: false })
        });
        const tags = [];
        $('.image-top').each((i, el) => {
            const imagenes = $(el).find('.image-container a').children('img').eq(0).attr('data-original')
            const azul = $(el).find('.category')
            const fecha = $(el).find('.published-at')
            const titulo = $(el).find('.title')
            tags.push({imagenes:`https://www.eltiempo.com/${imagenes}`,ciudad:azul.text(),fecha:fecha.text(),titulo:titulo.text()})
        })
         res.send({datos:tags[0]})
    } catch (e) {
        console.log(e);
    }
})

module.exports = Router;