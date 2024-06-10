const mongoose = require('mongoose');
const db = require('../config/connection');
const { User } = require('./models');
const userSeeds = require('./seeders/userSeeds');
const questionSeeds = require('./seeders/questionSeeds');

const seedDatabase = async () => {
  try {
    // Connect to the database
    await db.once('open', () => {
      console.log('Connected to MongoDB');
    });

    // Delete existing data
    console.log('Deleting existing data...');
    await User.deleteMany({});
    // If you have other models, add them here for deletion

    // Seed users
    console.log('Seeding users...');
    const users = await User.insertMany(userSeeds);
    console.log(`${users.length} users seeded!`);

    // Seed questions
    console.log('Seeding questions...');
    // Assuming you have a separate model for questions
    // and the questionSeeds data contains references to user IDs
    const questions = await Question.insertMany(questionSeeds.map(question => {
      const userIds = question.users.map(userId => users.find(user => user.username === userId)._id);
      return { ...question, users: userIds };
    }));
    console.log(`${questions.length} questions seeded!`);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();