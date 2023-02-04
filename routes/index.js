const express = require('express')
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')
const usuariosController = require('../controllers/usuariosController')

// Middleware para proteger ruta
const auth = require('../middleware/auth');


const router = express.Router()

module.exports = function() {

    /** CLIENTES */
    // Agrega nuevos clientes via POST
    router.post('/clientes', 
        auth,
        clienteController.nuevoCliente
    );

    // Obtener todos los clientes
    router.get('/clientes', 
        auth,
        clienteController.mostrarClientes
    )

    // Muestra un cliente en especifico 
    router.get('/clientes/:idCliente', 
        auth,
        clienteController.mostrarCliente
    ); //)

    // Actualizar Cliente
    router.put('/clientes/:idCliente', 
        auth,
        clienteController.actualizarCliente
    ); //
    
    // Eliminar Cliente
    router.delete('/clientes/:idCliente', 
        auth,
        clienteController.eliminarCliente
    ); //
    
    /** PRODUCTOS */
    router.post('/productos',
        auth, 
        productosController.subirArchivo,
        productosController.nuevoProducto
    )

    // Muestra todos los productos
    router.get('/productos', 
        auth,
        productosController.mostrarProductos
    );
    
    // Muestra un producto en especifico por su ID
    router.get('/productos/:idProducto', 
        auth,    
        productosController.mostrarProducto
    );
    
    // Actualizar un producto en especifico por su ID
    router.put('/productos/:idProducto',
        auth, 
        productosController.subirArchivo,
        productosController.actualizarProducto
    );
   
    // Eliminar un producto en especifico por su ID
    router.delete('/productos/:idProducto',   
        auth,
        productosController.eliminarProducto 
    );

    // ? Busqueda de un producto
    router.post('/productos/busqueda/:query', 
        // auth,
        productosController.buscarProducto
    );

    /** PEDIDOS */
    // Agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idPedido',
        auth,
        pedidosController.nuevoPedido)

    // Mostrar todos los pedidos
    router.get('/pedidos', 
        auth,
        pedidosController.mostrarPedidos)

    // Muestra un pedido en especifico por su ID
    router.get('/pedidos/:idPedido', 
        auth,
        pedidosController.mostrarPedido);

    // Actualizar pedidos
    router.put('/pedidos/:idPedido', 
        auth,
        pedidosController.actualizarPedidos);

    // Eliminar el pedido
    router.delete('/pedidos/:idPedido', 
        auth,
        pedidosController.eliminarPedido);

    /** USUARIOS */
    router.post('/crear-cuenta', 
        usuariosController.registrarUsuario
    )

    router.post('/iniciar-sesion', 
        usuariosController.autenticarUsuario 
    )


    return router;

}

