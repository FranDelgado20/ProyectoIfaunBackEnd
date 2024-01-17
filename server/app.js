const express = require('express')

class Server {
    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }
    middleware(){
        this.app.use(express.json())
    }
    routes(){
        this.app.use('/user', require('../Routes/usuarios.routes'))
    }
    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log('Server en linea')
        })
    }
}
module.exports = Server