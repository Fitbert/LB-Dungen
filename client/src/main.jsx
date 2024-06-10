import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import './index.css';

import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/HomePage';
import LeaderBoardPage from './pages/LeaderBoardPage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import SplashPage from './pages/SplashPage.jsx';
import Donate from './pages/Donate.jsx';

// Load your publishable key from .env or another source
const stripePromise = loadStripe('your-publishable-key-here');

// Define the the URL routes that show specified page components/XML elements/views based on the URL
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SplashPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/leaderBoard',
        element: <LeaderBoardPage />,
      },
      {
        path: 'quiz',
        element: <QuizPage />,
      },
      {
        path: '/donate',
        element: <Donate />,
      },
    ],
  },
]);

// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
    </Elements>
  </React.StrictMode>
);
