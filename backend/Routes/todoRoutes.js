const express = require('express');
const { getTodos, addTodo, deleteTodo, exportTodos } = require('../controllers/todoController');
const router = express.Router();

router.get('/', getTodos);
router.post('/', addTodo);
router.delete('/:id', deleteTodo);
router.get('/export/:userId', exportTodos); // CSV Export

module.exports = router;