// Functional React component that displays a list of saved countries
function SavedCountries({ savedCountries = [] }) {
  return (
    // Main container for the countries section
    <div className="countries-container">
      {/* Title of the section */}
      <h1>Saved Countries</h1>

      {/* Conditional rendering:
          If there are no saved countries, show a message.
          Otherwise, map through the array and display each country. */}
      {savedCountries.length === 0 ? (
        // Message shown when the list is empty
        <p>No saved countries yet.</p>
      ) : (
        // Loop through each country object in the array
        savedCountries.map((country) => (
          // Each country card needs a unique key (using cca3 code)
          <div key={country.cca3} className="card">
            {/* Display the country flag */}
            <img
              src={country.flags.png}
              alt={country.name.common}
            />

            {/* Display the country name */}
            <h2>{country.name.common}</h2>

            {/* Display the region the country belongs to */}
            <p>{country.region}</p>
          </div>
        ))
      )}
    </div>
  );
}

// Export the component so it can be used in other files
export default SavedCountries;