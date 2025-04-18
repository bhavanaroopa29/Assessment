// backend/utils/exportData.js
const json2csv = require('json2csv').parse;

// Export todos to JSON format
exports.exportToJson = (res, todos) => {
  // Format the data for export
  const formattedTodos = todos.map(todo => ({
    id: todo._id,
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    tags: todo.tags.join(', '),
    user: todo.userId ? todo.userId.username : '',
    mentions: todo.mentions.map(user => user.username).join(', '),
    notes: todo.notes.map(note => note.content).join(' | '),
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt
  }));

  // Set headers for JSON download
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=todos.json');
  
  // Send the JSON data
  res.json(formattedTodos);
};

// Export todos to CSV format
exports.exportToCsv = (res, todos) => {
  try {
    // Format the data for export
    const formattedTodos = todos.map(todo => ({
      id: todo._id,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      tags: todo.tags.join(', '),
      user: todo.userId ? todo.userId.username : '',
      mentions: todo.mentions.map(user => user.username).join(', '),
      notes: todo.notes.map(note => note.content).join(' | '),
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    }));

    // Define CSV fields
    const fields = [
      'id',
      'title',
      'description',
      'priority',
      'tags',
      'user',
      'mentions',
      'notes',
      'createdAt',
      'updatedAt'
    ];

    // Convert JSON to CSV
    const csv = json2csv(formattedTodos, { fields });

    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=todos.csv');
    
    // Send the CSV data
    res.send(csv);
  } catch (err) {
    console.error('CSV Export Error:', err);
    res.status(500).json({ message: 'Error exporting to CSV' });
  }
};