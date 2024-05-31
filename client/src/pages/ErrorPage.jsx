

import { useRouteError } from 'react-router-dom';
//create const for the useRouteError import
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
//return error message using error variable
  return (
    <div id="error-page">
      <h1>Oh No!</h1>
      <p>Sorry, we have encountered an error.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
