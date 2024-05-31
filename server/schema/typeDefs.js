import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Project {
    id: ID!
    name: String!
  }

  type Task {
    id: ID!
    title: String!
  }

  type Query {
    users: [User]
    projects: [Project]
    tasks: [Task]
  }

  type Mutation {
    addUser(name: String!): User
    addProject(name: String!): Project
    addTask(title: String!): Task
  }
`;

export default typeDefs;
