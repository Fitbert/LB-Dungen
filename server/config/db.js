const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.DB_NAME}`;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

module.exports = mongoose.connection;
