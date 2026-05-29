import { useParams, Link } from "react-router-dom";

function CountryDetail({ countries, onSave }) {
  const countryName = useParams().name;

  const country = countries.find(
    (c) =>
      c.name.common.toLowerCase() === countryName.toLowerCase()
  );

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
          <strong>Viewed:</strong> 0 times
        </p>

          </div>
        </div>

      </div>
);
}
export default CountryDetail;