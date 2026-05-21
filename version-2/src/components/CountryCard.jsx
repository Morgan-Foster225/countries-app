// Import Link for client-side navigation (React Router)
import { Link } from "react-router-dom";

// Functional component that displays a single country card
function CountryCard({ country }) {
  // Destructure needed properties from the country object
  const {
    name,
    population,
    capital,
    region,
    flags,
  } = country;

  return (
    // Wrap the entire card in a Link so it navigates to the country detail page
    <Link to={`/country/${name.common}`} className="card">

      {/* Country flag image */}
      <img src={flags.png} alt={name.common} />

      {/* Card content section */}
      <div className="card-body">

        {/* Country name */}
        <h3>{name.common}</h3>

        {/* Population with formatting for readability (e.g., 1,000,000) */}
        <p>
          <strong>Population:</strong>{" "}
          {population.toLocaleString()}
        </p>

        {/* Capital city (uses optional chaining in case data is missing) */}
        <p>
          <strong>Capital:</strong>{" "}
          {capital?.[0] || "N/A"}
        </p>

        {/* Region of the country */}
        <p>
          <strong>Region:</strong> {region}
        </p>
      </div>
    </Link>
  );
}

// Export component for use in other parts of the app
export default CountryCard;