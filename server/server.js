import express from 'express';
import { schema } from './schema/schema.js';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({ schema });

const StartServer = async () => {
  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`); 
  });
};

StartServer();
