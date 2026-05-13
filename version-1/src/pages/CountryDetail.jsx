import { useParams, Link } from "react-router-dom";

function CountryDetail({ countries }) {
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

      <div className="detail-content">

        <img
          src={country.flags?.png}
          alt={`${country.name.common} flag`}
        />

        <div className="detail-info">
          <h1>{country.name.common}</h1>

          <p><strong>Population:</strong> {country.population}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Capital:</strong> {country.capital}</p>
        </div>

      </div>
    </div>
  );
}

export default CountryDetail;