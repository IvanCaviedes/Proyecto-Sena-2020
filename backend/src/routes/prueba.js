const express = require('express');

const {ramdomNumber} = require('../libs/libs')
const path = require('path')
const fs = require('fs-extra')

const Router = express.Router();

Router.post('/',async(req,res)=>{
/*     const imgutl = ramdomNumber();
    const ext = path.extname(req.file.originalname).toLowerCase();
    const imagetemppath = req.file.path;
    const targetpath = path.resolve(`src/public/uploads/${imgutl}${ext}`) 

     if (ext === '.png'||ext === '.jpg'||ext === '.jpeg'||ext === '.gif' ) {
        await fs.rename(imagetemppath, targetpath)
    }  */
    console.log(req.file)
    res.send({mensaje:'buena'})
}) 

      module.exports = Router;