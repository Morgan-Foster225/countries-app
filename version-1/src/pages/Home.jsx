import CountryCard from "../components/CountryCard";

// Main Home component
function Home({ countries }) {
  return (
    <div className="container">
      {/* Search + filter UI (not yet functional) */}
      <div className="search-filter">
        <input placeholder="Search for a country..." />

        <select>
          <option>Filter by Region</option>
        </select>
      </div>

      {/* Countries grid */}
      <div className="countries-grid">
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;