const Usuarios = require('../models/Usuario')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { response } = require('express');


exports.registrarUsuario = async (req, res) => {

    const { email } = req.body;
    const usuarioExistente = await Usuarios.findOne({ email });

    if(usuarioExistente) {
        // Si el usuario no existe
        await res.status(401).json({mensaje: 'Usuario existente'});
        next();
    }else {

        // leer los datos del Usuario y colocarlos en el Modelo Usuario
        const usuario = new Usuarios(req.body);

        usuario.password = await bcrypt.hash(req.body.password, 12);

        // TryCatch por si falla la insercion a la BD
        try {
            // Guardar
            await usuario.save();
            res.json({mensaje: 'Usuario Creado Correctamente'});
        } catch (error) {
            console.log(error);
            res.json({mensaje: 'Hubo un error'})
        }

    }

}

exports.autenticarUsuario = async (req, res, next) => {
    
    // Buscar el usuario
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });

    if(!usuario) {
        // Si el usuario no existe
        await res.status(401).json({mensaje: 'Ese usuario no existe'});
        next();
    } else {
        // El usuario existe, verificar si el password es correcto o incorrecto
        if (!bcrypt.compareSync(password, usuario.password)) {
            // si el password incorrecto
            await res.status(401).json({mensaje: 'Password Incorrecto'});
            next();
        } else {
            // password correcto, firmar y crear el token
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                _id: usuario._id
                }, 
            
                'LLAVESECRETA',
                {
                    expiresIn: '1h'
                });

                res.json({token: token})
        }


    }
};