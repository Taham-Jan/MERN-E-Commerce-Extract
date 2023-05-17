const express = require('express');
const userController = require('../Controllers/user');
const { isAuthenticatedUser, authorizeRole} = require('../Middleware/auth');

const router = express.Router();
router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);
router.post('/password/forgot',userController.forgotPassword);
router.put('/password/reset/:token',userController.resetPassword);
router.get('/logout',userController.logoutUser);
router.get('/me',isAuthenticatedUser,userController.getUserDetails);
router.put('/password/update',isAuthenticatedUser,userController.updatePassword);
router.put('/me/update',isAuthenticatedUser,userController.updateProfile);
router.get('/admin/users',isAuthenticatedUser,authorizeRole("admin"),userController.getAllUser);
router.get('/admin/user/:id',isAuthenticatedUser,authorizeRole("admin"),userController.getUserDetailsAdmin);
router.put('/admin/user/:id',isAuthenticatedUser,authorizeRole("admin"),userController.updateUserAdmin);
router.delete('/admin/user/:id',isAuthenticatedUser,authorizeRole("admin"),userController.DeleteUserAdmin);

module.exports = router;  