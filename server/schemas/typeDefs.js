const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    password: String!
    quizzes: [Quiz]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Quiz {
    id: ID!
    title: String!
    questions: [Question]
  }

  type Question {
    id: ID!
    content: String!
    answers: [Answer]
  }

  type Answer {
    id: ID!
    content: String!
    questionId: ID!
  }

  type Query {
    users: [User]
    user(username: String!): User
    quizzes: [Quiz]
    quiz(title: String!): Quiz
    questions: [Question]
    question(content: String!): Question
    answers: [Answer]
    answer(content: String!): Answer
    me: User
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addQuiz(title: String!): Quiz
    addQuestion(content: String!, quizId: ID!): Question
    addAnswer(content: String!, questionId: ID!): Answer
  }
`;

module.exports = typeDefs;