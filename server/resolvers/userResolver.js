const userResolver = {
  Query: {
    users: () => {
      // Your logic to get users
      return [
        { id: '1', name: 'User One' },
        { id: '2', name: 'User Two' },
      ];
    },
  },
  Mutation: {
    addUser: (parent, args) => {
      // Your logic to add a user
      const newUser = { id: '3', name: args.name };
      return newUser;
    },
  },
};

export default userResolver;
