//Variables Globales

module.exports = {
    //Puerto
    PORT: process.env.PORT || 4000,
    //Dase de datos
    DB: process.env.DB || '',
    //Llave secreta
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'estaesmillavesecreta'
}