const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');

const quizzes = [
  {
    title: 'Spanish Basics',
    questions: [
      {
        content: 'What is the Spanish word for "apple"?',
        answers: [
          { content: 'Manzana', correct: true },
          { content: 'Pera', correct: false },
          { content: 'Naranja', correct: false },
          { content: 'Uva', correct: false },
        ],
      },
      {
        content: 'How do you say "Good morning" in Spanish?',
        answers: [
          { content: 'Buenos días', correct: true },
          { content: 'Buenas noches', correct: false },
          { content: 'Buenas tardes', correct: false },
          { content: 'Hola', correct: false },
        ],
      },
    ],
  },
  {
    title: 'Advanced Spanish',
    questions: [
      {
        content: 'What is the Spanish word for "cat"?',
        answers: [
          { content: 'Gato', correct: true },
          { content: 'Perro', correct: false },
          { content: 'Caballo', correct: false },
          { content: 'Pájaro', correct: false },
        ],
      },
      {
        content: 'How do you say "Thank you" in Spanish?',
        answers: [
          { content: 'Gracias', correct: true },
          { content: 'Por favor', correct: false },
          { content: 'Hola', correct: false },
          { content: 'Adiós', correct: false },
        ],
      },
    ],
  },
];

const seedQuizzes = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/languagedungeon', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing quizzes
    await Quiz.deleteMany({});

    await Quiz.insertMany(quizzes);

    console.log('Quizzes seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedQuizzes();
