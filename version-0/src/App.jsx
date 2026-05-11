// Import React Router components for routing and navigation
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import page components
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import CountryDetail from "./pages/CountryDetail";

// Import global styles
import "./App.css";

// Main App component that handles routing
function App() {
  return (
    // Router wraps the entire application to enable navigation
    <Router>

      {/* Header section shown on all pages */}
      <header className="header">

        {/* Logo link redirects to home page */}
        <Link to="/" className="logo">
          Where in the World?
        </Link>

        {/* Link to saved countries page */}
        <Link to="/saved" className="saved">Saved Countries</Link>
      </header>

      {/* Define application routes */}
      <Routes>

        {/* Home page route */}
        <Route path="/" element={<Home />} />

        {/* Saved countries page route */}
        <Route path="/saved" element={<SavedCountries />} />

        {/* Country detail page route with dynamic URL parameter */}
        <Route path="/country/:name" element={<CountryDetail />} />

      </Routes>
    </Router>
  );
}

// Export App component as the root of the application
export default App;