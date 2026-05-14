// Import routing components from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import React hooks
import { useEffect, useState } from "react";

// Import your page components
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import CountryDetail from "./pages/CountryDetail";

// Import CSS styling
import "./App.css";

function App() {
  // State to store all countries fetched from the API
  const [countries, setCountries] = useState([]);

  // Function to fetch country data from the API
  const fetchCountries = async () => {
    try {
      // Make API request
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
      );

      // Convert response to JSON
      const data = await response.json();

      // Sort countries alphabetically by name
      const sorted = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      // Save sorted countries into state
      setCountries(sorted);
    } catch (error) {
      // Handle errors
      console.error("Error fetching countries:", error);
    }
  };

  // Run fetchCountries() once when the component loads
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <Router>
      {/* Header navigation */}
      <header className="header">
        {/* Link to home page */}
        <Link to="/" className="logo">
          Where in the World?
        </Link>

        {/* Link to saved countries page */}
        <Link to="/saved" className="saved">
          Saved Countries
        </Link>
      </header>

      {/* Define routes and pass countries data as props */}
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home countries={countries} />} />

        {/* Saved countries page */}
        <Route
          path="/saved"
          element={<SavedCountries countries={countries} />}
        />

        {/* Country detail page (dynamic route using :name) */}
        <Route
          path="/country/:name"
          element={<CountryDetail countries={countries} />}
        />
      </Routes>
    </Router>
  );
}

// Export App component
export default App;