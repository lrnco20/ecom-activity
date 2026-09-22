import { Link } from "react-router-dom";
function NotFound() {
  return <div className="container empty-card"><h1>404</h1><h2>Page Not Found</h2><p>The page you requested does not exist.</p><Link to="/" className="main-button">Return Home</Link></div>;
}
export default NotFound;