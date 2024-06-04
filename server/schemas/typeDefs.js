import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Answer {
    id: ID!
    content: String!
    questionId: ID!
  }

  type Question {
    id: ID!
    content: String!
    answers: [Answer]
  }

  type Quiz {
    id: ID!
    title: String!
    questions: [Question]
  }

  type Query {
    quizzes: [Quiz]
    quiz(id: ID!): Quiz
    questions: [Question]
    question(id: ID!): Question
    answers: [Answer]
    answer(id: ID!): Answer
  }

  type Mutation {
    addQuiz(title: String!): Quiz
    addQuestion(content: String!, quizId: ID!): Question
    addAnswer(content: String!, questionId: ID!): Answer
  }
`;
