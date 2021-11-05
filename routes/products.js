const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const ProductsController = require('../controllers/products-controller');

router.get('/', login.opcional, (req, res, next) => { res.render('products.ejs'); });
router.get('/api', login.opcional, ProductsController.getProdutos);
router.get('/api/:id_produto', login.opcional, ProductsController.getProduto);
router.post('/api', login.opcional, ProductsController.insertProduto);
router.put('/api', login.opcional, ProductsController.updateProduto);
router.delete('/api/:id_produto', ProductsController.deleteProduto);

module.exports = router;
