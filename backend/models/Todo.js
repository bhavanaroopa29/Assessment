// backend/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get all todos with filtering, sorting, and pagination
router.get('/', todoController.getAllTodos);

// Get a single todo
router.get('/:id', todoController.getTodoById);

// Create a new todo
router.post('/', todoController.createTodo);

// Update a todo
router.put('/:id', todoController.updateTodo);

// Delete a todo
router.delete('/:id', todoController.deleteTodo);

// Add a note to a todo
router.post('/:id/notes', todoController.addNote);

// Export todos
router.get('/export/:format', todoController.exportTodos);

module.exports = router;