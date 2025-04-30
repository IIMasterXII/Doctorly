import { useRouteError } from 'react-router-dom';

// This error page is displayed when an error occurs during routing
// or when a route fails to load. It provides a user-friendly message
interface RouteError {
  statusText?: string;
  message?: string;
}

// This component is used to display an error page when an error occurs
// during routing or when a route fails to load. It provides a user-friendly
// message to the user and logs the error to the console for debugging purposes.
export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
