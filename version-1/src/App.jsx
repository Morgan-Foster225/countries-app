import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import CountryDetail from "./pages/CountryDetail";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  //  Function to fetch API data
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  //  Run on page load
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <Router>
      <header className="header">
        <Link to="/" className="logo">
          Where in the World?
        </Link>

        <Link to="/saved" className="saved">
          Saved Countries
        </Link>
      </header>

      {/*  Pass API data into all pages */}
      <Routes>
        <Route path="/" element={<Home countries={countries} />} />
        <Route path="/saved" element={<SavedCountries countries={countries} />} />
        <Route path="/country/:name" element={<CountryDetail countries={countries} />} />
      </Routes>
    </Router>
  );
}

export default App;