const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
import { schema } from './schemas/index.js'; 

const { typeDefs, resolvers } = require('./schemas');
const connectDB = require('./config/db');
// import dotenv from 'dotenv';
// import cors from 'cors';

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({ 
  typeDefs,
  resolvers,
 });

const StartServer = async () => {
  await server.start();

  // app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/graphql', expressMiddleware( server, {context: authMiddleware }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

 connectDB.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

StartServer();