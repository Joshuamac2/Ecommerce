const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products', productsController.getProducts);
router.post('/products', productsController.createProduct);
router.put('/products/:product_id', productsController.editProduct);
router.delete('/products/:product_id', productsController.deleteProduct);

module.exports = router;
