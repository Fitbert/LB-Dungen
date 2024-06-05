const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const users = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('mypassword', 10),
  },
  {
    username: 'miguel_garcia',
    email: 'miguel@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    username: 'ana_rodriguez',
    email: 'ana@example.com',
    password: bcrypt.hashSync('password', 10),
  },
  {
    username: 'luis_martinez',
    email: 'luis@example.com',
    password: bcrypt.hashSync('secret', 10),
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/languagedungeon', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing users
    await User.deleteMany({});

    await User.insertMany(users);

    console.log('Users seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedUsers();
