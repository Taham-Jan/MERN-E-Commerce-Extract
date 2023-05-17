const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRole} = require('../Middleware/auth');
const orderController = require('../Controllers/order');

router.post('/order/new',isAuthenticatedUser,orderController.newOrder);
router.get('/orders/me',isAuthenticatedUser,orderController.userMyOrders);
router.get('/order/:id',isAuthenticatedUser,orderController.getSingleOrder);
router.get('/admin/orders',isAuthenticatedUser,authorizeRole('admin'),orderController.getAllOrders);
router.put('/admin/order/:id',isAuthenticatedUser,authorizeRole('admin'),orderController.updateOrder);
router.delete('/admin/order/:id',isAuthenticatedUser,authorizeRole('admin'),orderController.deleteOrder);

module.exports = router;