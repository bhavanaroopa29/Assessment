// backend/controllers/userController.js
const User = require('../models/User');
const Todo = require('../models/todo');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('username name avatar');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get todos for a specific user
exports.getUserTodos = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Count total documents
    const total = await Todo.countDocuments({ userId: req.params.id });
    
    // Find todos for the user with pagination
    const todos = await Todo.find({ userId: req.params.id })
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

// Get a single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username name avatar');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};