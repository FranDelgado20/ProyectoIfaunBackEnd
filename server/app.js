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
        this.app.use(morgan('dev'))
        this.app.use(cors())
    }
    routes(){
        this.app.use('/user', require('../Routes/usuarios.route'))
    }
    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log('Server en linea')
        })
    }
}
module.exports = Server