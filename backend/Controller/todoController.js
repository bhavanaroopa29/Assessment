// backend/controllers/todoController.js
const Todo = require('../models/todo')
const User = require('../models/User');
const exportData = require('../utils/exportData');

// Get all todos with filtering, sorting, and pagination
exports.getAllTodos = async (req, res) => {
  try {
    const { page = 1, limit = 10, tags, priority, user, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    // Build filter object
    const filter = {};
    if (tags) filter.tags = { $in: tags.split(',') };
    if (priority) filter.priority = priority;
    if (user) filter.userId = user;
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Count total documents
    const total = await Todo.countDocuments(filter);
    
    // Find todos with pagination
    const todos = await Todo.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('userId', 'username name avatar')
      .populate('mentions', 'username name avatar');
    
    res.json({
      todos,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single todo
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
      .populate('userId', 'username name avatar')
      .populate('mentions', 'username name avatar');
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description, priority, tags, mentions, userId } = req.body;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Process mentions if any
    let mentionIds = [];
    if (mentions && mentions.length > 0) {
      // Extract usernames from @mentions in the description
      const mentionedUsers = await User.find({
        username: { $in: mentions }
      });
      
      mentionIds = mentionedUsers.map(user => user._id);
    }
    
    const todo = new Todo({
      title,
      description,
      priority,
      tags: tags || [],
      mentions: mentionIds,
      userId
    });
    
    const savedTodo = await todo.save();
    
    // Populate user data before sending response
    const populatedTodo = await Todo.findById(savedTodo._id)
      .populate('userId', 'username name avatar')
      .populate('mentions', 'username name avatar');
    
    res.status(201).json(populatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const { title, description, priority, tags, mentions } = req.body;
    
    // Process mentions if any
    let mentionIds = [];
    if (mentions && mentions.length > 0) {
      const mentionedUsers = await User.find({
        username: { $in: mentions }
      });
      
      mentionIds = mentionedUsers.map(user => user._id);
    }
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        priority,
        tags: tags || [],
        mentions: mentionIds,
        updatedAt: Date.now()
      },
      { new: true }
    )
    .populate('userId', 'username name avatar')
    .populate('mentions', 'username name avatar');
    
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a note to a todo
exports.addNote = async (req, res) => {
  try {
    const { content } = req.body;
    
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    todo.notes.push({ content });
    todo.updatedAt = Date.now();
    
    const updatedTodo = await todo.save();
    
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Export todos
exports.exportTodos = async (req, res) => {
  try {
    const { format } = req.params;
    const { userId } = req.query;
    
    // Find todos for the specified user
    const filter = {};
    if (userId) filter.userId = userId;
    
    const todos = await Todo.find(filter)
      .populate('userId', 'username name')
      .populate('mentions', 'username');
    
    if (format === 'json') {
      return exportData.exportToJson(res, todos);
    } else if (format === 'csv') {
      return exportData.exportToCsv(res, todos);
    } else {
      return res.status(400).json({ message: 'Invalid export format. Use json or csv.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};