// Import the CountryCard component used to display each country
import CountryCard from "../components/CountryCard";

// Import local data (array of country objects)
import localData from "../../localData";

// Main Home component
function Home() {
  return (
    // Main container for the page
    <div className="container">

      {/* Search input and region filter dropdown */}
      <div className="search-filter">
        {/* Input field for searching countries (not yet functional) */}
        <input placeholder="Search for a country..." />

        {/* Dropdown for filtering by region (not yet functional) */}
        <select>
          <option>Filter by Region</option>
        </select>
      </div>

      {/* Grid layout to display country cards */}
      <div className="countries-grid">
        {/* Loop through localData and render a CountryCard for each country */}
        {localData.map((country) => (
          <CountryCard
            key={country.cca3}   // Use unique country code as key (better than name)
            country={country}    // Pass full country object as a prop
          />
        ))}
      </div>
    </div>
  );
}

// Export the component for use in other parts of the app
export default Home;