//import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Headers from './components/Header';

function App() {
  return (
    <>
      <Headers />
      <Outlet />
    </>
  );
}

export default App;
