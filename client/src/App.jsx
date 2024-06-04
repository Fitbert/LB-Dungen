import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from "./components/Navigation.jsx";  // Corrected import statement

function App() {
  return (
    <Fragment>
      <Navigation />
      <Outlet />
    </Fragment>
  );
}

export default App;
