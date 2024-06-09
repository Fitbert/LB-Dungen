const express = require('express');
const cors = require('cors');
const db = require('./config/db.js');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas/index.js'); // Updated import
const { authMiddleware } = require('./utils/auth.js');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const StartServer = async () => {
  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/graphql', expressMiddleware(server, { context: authMiddleware }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://0.0.0.0:${PORT}/graphql`);
    });
  });
};

StartServer();
