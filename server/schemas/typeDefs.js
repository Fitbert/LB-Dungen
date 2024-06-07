const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Quiz {
    _id: ID!
    title: String!
    questions: [Question!]!
  }
  
  type Question {
    _id: ID!
    question: String!
    options: [String!]!
    correctAnswer: String!
    quizId: ID!
  }

  type Query {
    users: [User]
    user(username: String!): User
    quizzes: [Quiz]
    quiz(id: ID!): Quiz
    questions(quizId: ID!): [Question]
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    createQuiz(title: String!): Quiz
    addQuestion(quizId: ID!, 
    question: String!, 
    options: [String!]!, 
    correctAnswer: String!): Question!
  }
`;

module.exports = typeDefs;