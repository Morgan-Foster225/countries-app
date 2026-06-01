import { useParams, Link } from "react-router-dom";

import { useState, useEffect } from "react";

function CountryDetail({ countries, onSave }) {
  const countryName = useParams().name;

  const [viewCount, setViewCount] = useState(0); 

  const country = countries.find(
    (c) =>
      c.name.common.toLowerCase() === countryName.toLowerCase()
  );

 // Runs whenever the country page is opened
  useEffect(() => {
    async function updateViewCount() {
      try {
        // Send a POST request to update the country's view count
        const response = await fetch(
          "/api/update-one-country-count",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // Send the country's name to the API
            body: JSON.stringify({
              country_name: country.name.common,
            }),
          }
        );

        // Convert response to JSON
        const data = await response.json();

        // Update state with the new count returned by the API
        setViewCount(data.count);
      } catch (error) {
        console.error("Error updating count:", error);
      }
    }

    // Only run if a country was found
    if (country) {
      updateViewCount();
    }
  }, [country]);

  // Display message if country is not found
  if (!country) {
    return <h2>Country not found</h2>;
  }
  return (
  <div className="detail-container">

    {/* Back Button */}
    <Link to="/" className="back-btn">
      ← Back
    </Link>

    <div className="detail-content">

      {/* FLAG */}
      <div className="detail-flag">
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
        />
      </div>

      {/* INFO */}
      <div className="detail-info">

        <h1>{country.name.common}</h1>

<button onClick={() => onSave(country)}>
  Save
</button>

        <p>
          <strong>Population:</strong>{" "}
          {country.population.toLocaleString()}
        </p>

        <p>
          <strong>Capital:</strong>{" "}
          {country.capital?.[0] || "N/A"}
        </p>

        <p>
          <strong>Region:</strong> {country.region}
        </p>
        
 <p>
  <strong>Viewed:</strong> {viewCount} times
</p>
      
  
          </div>
        </div>

      </div>
);
}
export default CountryDetail;