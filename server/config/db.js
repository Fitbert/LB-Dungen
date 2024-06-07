require("dotenv").config();
const mongoose = require('mongoose');

// dotenv.config();

// const db = async () => {
//   try {
//     console.log('MongoDB connected');
//     } catch (error) {
//       console.error('MongoDB connection error:', error);
//       process.exit(1);
//       }
//       };
      
 mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/languagedungeon');
module.exports = mongoose.connection;
