const router = require('express').Router();

const { verificaToken } = require('../middlewares/middlewares');
const loginController = require('../controllers/loginController');
const empleadoController = require('../controllers/empleadoController');
const productoController = require('../controllers/productoController');
const proveedorController = require('../controllers/proveedorController');
const clienteController = require('../controllers/clienteController');
const ordenCompraController = require('../controllers/ordenCompraController');
const ordenVentaController = require('../controllers/ordenVentaController');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

// ------------------------------ RUTAS PÚBLICAS ------------------------------ //


router.post('/login', loginController.login);

router.post('/empleado', empleadoController.nuevoEmpleado); // Añade Empleado
router.get('/empleado/:id?', empleadoController.buscarEmpleado); // Busca Empleado
router.get('/empleados', empleadoController.listarEmpleados); // Lista Empleados
router.put('/empleado/:id', empleadoController.editarEmpleado); // Actualiza Empleado
router.delete('/empleado/:id', empleadoController.borrarEmpleado); // Borrar Empleado
router.post('/upload-image/:id', multipartMiddleware, empleadoController.uploadImage); // Subir imagen empleado
router.get('/get-image/:image', empleadoController.getImageFile);  //  Buscar imagen empleado

router.post('/producto', productoController.nuevoProducto); // Añade Producto
router.get('/producto/:id?', productoController.buscarProducto); // Busca Producto  
router.get('/productos', productoController.listarProductos); // Lista Productos   
router.put('/producto/:id', productoController.editarProducto); // Actualiza Producto
router.delete('/producto/:id', productoController.borrarProducto); // Borrar Producto

router.post('/proveedor', proveedorController.nuevoProveedor); // Añade Proveedor
router.get('/proveedor/:id?', proveedorController.buscarProveedor); // Busca Proveedor 
router.get('/proveedores', proveedorController.listarProveedores); // Lista Proveedores   
router.put('/proveedor/:id', proveedorController.editarProveedor); // Actualiza Proveedor
router.delete('/proveedor/:id', proveedorController.borrarProveedor); // Borrar Proveedor

router.post('/cliente', clienteController.nuevoCliente); // Añade Cliente
router.get('/cliente/:id?', clienteController.buscarCliente); // Busca Cliente
router.get('/clientes', clienteController.listarClientes); // Lista Clientes
router.put('/cliente/:id', clienteController.editarCliente); // Actualiza Cliente
router.delete('/cliente/:id', clienteController.borrarCliente); // Borrar Cliente

router.post('/orden_compra', ordenCompraController.nuevoOrdenCompra); // Añade Orden de Compra
router.get('/orden_compra/:id?', ordenCompraController.buscarOrdenCompra); // Busca Orden de Compra
router.get('/orden_compras', ordenCompraController.listarOrdenCompras); // Lista Ordenes de Compras
router.put('/orden_compra/:id', ordenCompraController.editarOrdenCompra); // Actualiza Orden de Compra
router.delete('/orden_compra/:id', ordenCompraController.borrarOrdenCompra); // Borrar Orden de Compra

router.post('/orden_venta', ordenVentaController.nuevoOrdenVenta); // Añade Orden de Venta
router.get('/orden_venta/:id?', ordenVentaController.buscarOrdenVenta); // Busca Orden de Venta
router.get('/orden_ventas', ordenVentaController.listarOrdenVentas); // Lista Ordenes de Ventas
router.put('/orden_venta/:id', ordenVentaController.editarOrdenVenta); // Actualiza Orden de Venta
router.delete('/orden_venta/:id', ordenVentaController.borrarOrdenVenta); // Borrar Orden de Venta


// ------------------------------ RUTAS PRIVADAS ------------------------------ //
router.get('/verify', verificaToken, (req, res) => {
        res.json('ja');
    })
    // router.get('/list/:page?', verificaToken, listarController.listar);


module.exports = router;