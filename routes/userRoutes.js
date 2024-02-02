const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authenticationMiddleware.js');

// Create a new user
router.post('/users',userController.createUser);

// Get all users
router.get('/users',userController.getAllUsers);

// Get user by ID
router.get('/users/:id',userController.getUserById);

// Update user by ID
router.put('/users/:id',userController.updateUserById);

// Delete user by ID (soft deletion)
router.delete('/users/:id',userController.deleteUserById);

module.exports = router;
