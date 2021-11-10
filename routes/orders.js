const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const OrdersController = require('../controllers/pedidos-controller');

router.get('/', login.opcional, (req, res, next) => { res.render('orders.ejs'); });
router.get('/api', login.opcional, OrdersController.getPedidos);
router.get('/api/:id_pedido', login.opcional, OrdersController.getPedido);
router.post('/api', login.opcional, OrdersController.insertPedido);
router.put('/api', login.opcional, OrdersController.updatePedido);
router.delete('/api/:id_pedido', OrdersController.deletePedido);

module.exports = router;