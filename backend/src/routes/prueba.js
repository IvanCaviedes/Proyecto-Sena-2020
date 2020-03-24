/* const express = require('express');
const Router = express.Router();
const puppeteer = require ('puppeteer');


Router.get('/', async (req, res) => {

const url = await ('https://www.eltiempo.com/noticias/mascotas')

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(url);

const [el] = await page.$x('//*[@id="main-container"]/div[14]/div[2]/div[1]/section[1]/div[1]/article/h3/a');
const text = await el.getProperty(textContent);
const name = await text.jsonValue();

browser.close();

Console.log({name})

return (name)
})

module.exports = Router; */

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
         res.send({datos:tags})
    } catch (e) {
        console.log(e);
    }
})
module.exports = Router;