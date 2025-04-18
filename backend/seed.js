// backend/seed.js
const User = require('./models/User');

// Seed users if none exist
const seedUsers = async () => {
  try {
    // Check if users exist
    const count = await User.countDocuments();
    
    if (count === 0) {
      console.log('Seeding users...');
      
      // Create default users
      const defaultUsers = [
        { username: 'johndoe', name: 'John Doe' },
        { username: 'janedoe', name: 'Jane Doe' },
        { username: 'bobsmith', name: 'Bob Smith' },
        { username: 'alicejohnson', name: 'Alice Johnson' },
        { username: 'mikebrown', name: 'Mike Brown' }
      ];
      
      await User.insertMany(defaultUsers);
      console.log('Users seeded successfully');
    }
  } catch (err) {
    console.error('Error seeding users:', err);
  }
};

module.exports = seedUsers;