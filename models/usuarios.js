const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    img:{
        type:String,
        default: "http://imgfz.com/i/SjUn0zM.png"
    },
    estadoCuenta:{
        type:Boolean,
        default:false
    }
})

UserSchema.methods.toJSON = function() {
    const {__v, pass, ...user} = this.toObject()
    return user
}
const ModeloUsuario = mongoose.model('Usuarios', UserSchema)

module.exports = ModeloUsuario