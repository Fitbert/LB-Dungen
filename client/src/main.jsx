import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/HomePage';
import LeaderBoardPage from './pages/LeaderBoardPage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import SplashPage from './pages/SplashPage.jsx';

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
        path: '/quiz',
        element: <QuizPage />,
      },
    ],
  },
]);

// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
