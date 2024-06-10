import { useRouteError } from 'react-router-dom';
import '../styles/main.css';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <div className="error-content">
        <img src="src/assets/Error_Page_Image.png" alt="logo" className="error-logo" />
        <p className="error-text">Sorry, we have encountered an error.</p>
        <p className="error-message">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}