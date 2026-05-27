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

  // Function to save a country
  const handleSaveCountry = (country) => {

    // Add country to saved list
    setSavedCountries([
      ...savedCountries,
      country,
    ]);
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
  element={<SavedCountries countries={savedCountries} />}
/>

    
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