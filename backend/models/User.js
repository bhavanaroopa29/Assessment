// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/', userController.getAllUsers);

// Get a single user
router.get('/:id', userController.getUserById);

// Get todos for a specific user
router.get('/:id/todos', userController.getUserTodos);

module.exports = router;