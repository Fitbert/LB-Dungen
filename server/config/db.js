require("dotenv").config();
const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/languagedungeon';

mongoose.connect(dbURI)
  .then(() => console.log('Mongoose is connected to', dbURI))
  .catch((err) => {
    console.error('Mongoose connection error:', err);
    process.exit(1);  // Exit the process if the connection fails
  });


  
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected to', dbURI);
});

module.exports = mongoose.connection;
