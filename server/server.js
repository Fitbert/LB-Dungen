import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import connectDB from './config/db.js';
import { schema } from './schema/schema.js'; 
import dotenv from 'dotenv';
import cors from 'cors';



dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable GraphiQL GUI for testing
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
