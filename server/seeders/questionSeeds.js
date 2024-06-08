const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const Question = require('../models/Questions');

const quizzes = [
  {
    title: 'Spanish Basics',
    questions: [
      {
        question: 'What is the Spanish word for "apple"?',
        options: ['Manzana', 'Pera', 'Naranja', 'Uva'],
        correctAnswer: 'Manzana',
      },
      {
        question: 'How do you say "Good morning" in Spanish?',
        options: ['Buenos días', 'Buenas noches', 'Buenas tardes', 'Hola'],
        correctAnswer: 'Buenos días',
      },
    ],
  },
  {
    title: 'Advanced Spanish',
    questions: [
      {
        question: 'What is the Spanish word for "cat"?',
        options: ['Gato', 'Perro', 'Caballo', 'Pájaro'],
        correctAnswer: 'Gato',
      },
      {
        question: 'How do you say "Thank you" in Spanish?',
        options: ['Gracias', 'Por favor', 'Hola', 'Adiós'],
        correctAnswer: 'Gracias',
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

    // Clear existing quizzes and questions
    await Quiz.deleteMany({});
    await Question.deleteMany({});

    // Create quizzes and questions
    for (const quiz of quizzes) {
      const createdQuiz = await Quiz.create({ title: quiz.title });
      for (const questionData of quiz.questions) {
        const createdQuestion = await Question.create({
          ...questionData,
          quizId: createdQuiz._id,
        });
        createdQuiz.questions.push(createdQuestion._id);
      }
      await createdQuiz.save();
    }

    console.log('Quizzes and questions seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedQuizzes();