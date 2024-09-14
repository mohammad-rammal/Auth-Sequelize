const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);

router.get('/product/:id', productController.getProductById);

router.post('/product', productController.createProduct);

router.patch('/product/:id', productController.updateProduct);

router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
