// Functional component that displays detailed information about a single country
function CountryDetail() {
  return (
    // Main container for the detail page
    <div className="detail-container">

      {/* Button to navigate back to the previous page */}
      <button className="back-button">← Back</button>

      {/* Wrapper for the main content (flag + info) */}
      <div className="detail-content">

        {/* Country flag image */}
        <img
          src="https://flagcdn.com/w320/de.png"
          alt="Country flag"
        />

        {/* Container for textual country information */}
        <div className="detail-info">

          {/* Country name heading */}
          <h1>Country Name</h1>

          {/* Country population information */}
          <p><strong>Population:</strong> 81,000,000</p>

          {/* Region the country belongs to */}
          <p><strong>Region:</strong> Europe</p>

          {/* Capital city of the country */}
          <p><strong>Capital:</strong> Berlin</p>
        </div>
      </div>
    </div>
  );
}

// Export component so it can be used in routing or other components
export default CountryDetail;