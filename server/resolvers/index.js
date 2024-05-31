import userResolver from './userResolver.js';
import projectResolver from './projectResolver.js';
import taskResolver from './taskResolver.js';

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...projectResolver.Query,
    ...taskResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...projectResolver.Mutation,
    ...taskResolver.Mutation,
  },
};

export default resolvers;
