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

  // State to store saved countries
  const [savedCountries, setSavedCountries] = useState([]);

  // Function to fetch country data from the API
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
      );

      const data = await response.json();

      // Save countries into state (no sorting)
      setCountries(data);

    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  // Run fetchCountries() once when the component loads
  useEffect(() => {

    fetchCountries();

    // load saved countries from localStorage
    const storedSaved =
      JSON.parse(localStorage.getItem("savedCountries")) || [];

    setSavedCountries(storedSaved);

  }, []);

// Function to save a country
const handleSaveCountry = async (country) => {

  try {

    await fetch(
      "/api/save-one-country",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          country_name: country.name.common,
        }),
      }
    );

    alert("Country saved!");

  } catch (error) {
    console.error("Save failed:", error);
  }


  // Save updated array into React state
  setSavedCountries(updatedSavedCountries);

  // persist to localStorage
  localStorage.setItem(
    "savedCountries",
    JSON.stringify(updatedSavedCountries)
  );

  alert("Country saved!");
};

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
        <Route
          path="/"
          element={<Home countries={countries} />}
        />

        {/* Saved countries page */}
      {/* Saved countries page */}
<Route
  path="/saved"
  element={
    <SavedCountries
      countries={countries}
    />
  }
/>

        {/* Country detail page (dynamic route using :name) */}
        <Route
          path="/country/:name"
          element={
            <CountryDetail
              countries={countries}
              onSave={handleSaveCountry}
            />
          }
        />

      </Routes>

    </Router>
  );
}

// Export App component
export default App;