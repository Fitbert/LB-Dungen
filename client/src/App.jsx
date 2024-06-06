//import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Headers from './components/Header';
import Cursor from './components/Cursor';
function App() {
  return (
    <>
      {window.location.pathname !== '/' && <Headers />}
      <Cursor/>
      <Outlet />
    </>
  );
}

export default App;
