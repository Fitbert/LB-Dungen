const questions = [
    {
      id: '1',
      content: 'What is the Spanish word for "apple"?',
      answers: [
        { id: '1', content: 'Manzana', questionId: '1' },
        { id: '2', content: 'Pera', questionId: '1' },
      ],
    },
    {
      id: '2',
      content: 'How do you say "Good morning" in Spanish?',
      answers: [
        { id: '3', content: 'Buenos días', questionId: '2' },
        { id: '4', content: 'Buenas noches', questionId: '2' },
      ],
    },
  ];
  
  const answers = [
    { id: '1', content: 'Manzana', questionId: '1' },
    { id: '2', content: 'Pera', questionId: '1' },
    { id: '3', content: 'Buenos días', questionId: '2' },
    { id: '4', content: 'Buenas noches', questionId: '2' },
  ];
  
  const resolvers = {
    Query: {
      questions: async () => {
        return questions;
      },
      question: async (_, { id }) => {
        return questions.find((question) => question.id === id);
      },
      answers: async () => {
        return answers;
      },
      answer: async (_, { id }) => {
        return answers.find((answer) => answer.id === id);
      },
    },
    Mutation: {
      addQuestion: async (_, { content }) => {
        const newQuestion = {
          id: String(questions.length + 1),
          content,
          answers: [],
        };
        questions.push(newQuestion);
        return newQuestion;
      },
      addAnswer: async (_, { content, questionId }) => {
        const newAnswer = {
          id: String(answers.length + 1),
          content,
          questionId,
        };
        answers.push(newAnswer);
  
        const question = questions.find((question) => question.id === questionId);
        if (question) {
          question.answers.push(newAnswer);
        }
  
        return newAnswer;
      },
    },
    Question: {
      answers: async (parent) => {
        return answers.filter((answer) => answer.questionId === parent.id);
      },
    },
    Answer: {
      question: async (parent) => {
        return questions.find((question) => question.id === parent.questionId);
      },
    },
  };
  
  export default resolvers;
  