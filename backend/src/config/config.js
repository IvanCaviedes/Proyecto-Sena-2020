module.exports = {
    PORT: process.env.PORT || 4000,
    DB: process.env.DB || 'mongodb://localhost:30017/Veterinaria',
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'estaesmillavesecreta'
}