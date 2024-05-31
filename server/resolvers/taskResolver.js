const taskResolver = {
  Query: {
    tasks: () => {
      // Your logic to get tasks
      return [
        { id: '1', title: 'Task One' },
        { id: '2', title: 'Task Two' },
      ];
    },
  },
  Mutation: {
    addTask: (parent, args) => {
      // Your logic to add a task
      const newTask = { id: '3', title: args.title };
      return newTask;
    },
  },
};

export default taskResolver;
