const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/db');
require('dotenv').config();
const cors = require('cors');

const User = require('./models/User'); // Import User model

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for CORS
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: {
    cache: 'bounded',
  },
  context: ({ req }) => {
    console.log('Request headers:', req.headers);
    return authMiddleware({ req });
  },
});

async function startApolloServer() {
  try {
    await server.start();
    server.applyMiddleware({ app });

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Define a REST endpoint for POST requests
    app.post('/api/users', async (req, res) => {
      console.log('Request body:', req.body);
      try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
      });
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

startApolloServer();
