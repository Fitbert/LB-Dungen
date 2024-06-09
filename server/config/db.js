require("dotenv").config();
const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/languagedungeon';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected to', dbURI);
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
  process.exit(1);  // Exit the process if the connection fails
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose is disconnected');
});

module.exports = mongoose.connection;
