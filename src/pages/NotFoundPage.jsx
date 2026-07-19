import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, this page doesn't exist.</p>
      <Link to="/">Go back home</Link>
    </section>
  );
}

export default NotFound;