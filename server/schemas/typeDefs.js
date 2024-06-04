// define the type definitions for the schema
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
    quizzes: [Quiz]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Quiz {
    _id: ID!
    title: String!
    questions: [Questions]!
  }

  type Questions {
    _id: ID!
    questionText: String!
    answers: [Answer]!
  }

  type Answer {
    _id: ID!
    answerText: String!
    correct: Boolean!
  }

  type Query {
    users: [User]!
    user(username: String!): User
    quizzes: [Quiz]!
    quiz(quizId: ID!): Quiz
    me: User
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addQuiz(title: String!): Quiz
    addQuestion(quizId: ID!, questionText: String!): Quiz
    addAnswer(questionId: ID!, answerText: String!, correct: Boolean!): Quiz
  }
`;

export default typeDefs;