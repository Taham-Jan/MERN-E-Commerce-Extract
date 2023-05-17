const express = require('express');
const productController = require('../Controllers/product');
const { isAuthenticatedUser, authorizeRole} = require('../Middleware/auth');
const router = express.Router();

router.get('/products',productController.getAllProducts);
router.get('/admin/products',isAuthenticatedUser,authorizeRole("admin"),productController.getAllAdminProducts);
router.post('/admin/product/new',isAuthenticatedUser,authorizeRole("admin"),productController.createProduct);
router.put('/admin/product/:id',isAuthenticatedUser,authorizeRole("admin"),productController.updateProduct);
router.delete('/admin/product/:id',isAuthenticatedUser,authorizeRole("admin"),productController.deleteProduct);
router.get('/product/:id',productController.getProductDetails);
router.put('/review',isAuthenticatedUser,productController.createProductReview);
router.get('/reviews',productController.getProductReviews);
router.get('/productsreviews',productController.getAllProductsReviews);
router.delete('/reviews',isAuthenticatedUser,productController.deleteReview);

module.exports = router; 