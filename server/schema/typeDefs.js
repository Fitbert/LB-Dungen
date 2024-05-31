import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Quiz {
    id: ID!
    title: String!
    questions: [Questions]!
  }

  type Questions {
    id: ID!
    text: String!
    answers: [Answers]!
  }

  type Answer {
    id: ID!
    text: String!
    correct: Boolean!
  }

  type Query {
    users: [User]!
    quizzes: [Quiz]!
  }
`;

export default typeDefs;