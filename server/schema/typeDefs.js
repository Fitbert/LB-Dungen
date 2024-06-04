import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Answer {
    id: ID!
    content: String!
    questionId: ID!
    question: Question  # Add this line to include the question field
  }

  type Question {
    id: ID!
    content: String!
    answers: [Answer]
  }

  type Query {
    questions: [Question]
    question(id: ID!): Question
    answers: [Answer]
    answer(id: ID!): Answer
  }

  type Mutation {
    addQuestion(content: String!): Question
    addAnswer(content: String!, questionId: ID!): Answer
  }
`;

export default typeDefs;
