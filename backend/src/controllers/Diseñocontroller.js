function index (req,res){
    res.render('index')
}
function noticias (req,res){
    res.render('noticias')
}
module.exports = {
    index,
    noticias
}