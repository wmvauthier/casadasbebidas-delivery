const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const ProductsController = require('../controllers/products-controller');

router.get('/', login.opcional, (req, res, next) => { res.render('products.ejs'); });
router.get('/api', login.opcional, ProductsController.getIgrejas);
router.get('/api/onlyIgrejas', login.opcional, ProductsController.getOnlyIgrejas);
router.get('/api/onlyCongregations', login.opcional, ProductsController.getOnlyCongregations);
router.get('/api/:id_igreja', login.opcional, ProductsController.getIgreja);
router.post('/api', login.opcional, ProductsController.insertIgreja);
router.put('/api', login.opcional, ProductsController.updateIgreja);
router.delete('/api/:id_igreja', ProductsController.deleteIgreja);

module.exports = router;