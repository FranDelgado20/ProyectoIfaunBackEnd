const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }
    middleware(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static("public"))
        this.app.use(morgan('dev'))
        this.app.use(cors())
    }
    routes(){
        this.app.use('/user', require('../routes/usuarios.routes'))
    }
    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor en linea')
        })
    }
}
module.exports = Server