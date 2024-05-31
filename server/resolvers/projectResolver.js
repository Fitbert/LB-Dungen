const projectResolver = {
    Query: {
      projects: () => {
        // Your logic to get projects
        return [
          { id: '1', name: 'Project One' },
          { id: '2', name: 'Project Two' },
        ];
      },
    },
    Mutation: {
      addProject: (parent, args) => {
        // Your logic to add a project
        const newProject = { id: '3', name: args.name };
        return newProject;
      },
    },
  };
  
  export default projectResolver;
  