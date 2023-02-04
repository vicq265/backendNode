const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
    nombre: {
        type: 'string',
        trim: true,
    },
    apellido: {
        type: 'string',
        trim: true,
    }, 
    empresa: {
        type: 'string',
        trim: true,
    },
    email: {
        type: 'string',
        unique: true,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: 'string',
        trim: true
    }
})

module.exports = mongoose.model('Clientes', clientesSchema)
