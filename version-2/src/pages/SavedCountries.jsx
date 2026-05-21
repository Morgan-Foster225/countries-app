import { useState, useEffect } from "react";
import "../App.css";

// Function that displays a list of saved countries
function SavedCountries({ countries = [] }) {
  // State f frorm imputs 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  // create a state variable to hold the new user info
  const [newUserName, setNewUserName] = useState(null);

  // write a function, use async await, use try... catch, fetch request
  const getUserNewestInfo = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-newest-user"
      );
      const data = await response.json();

      // safe access to avoid crashing if API is empty
      setNewUserName(data?.[0]?.name || null);
    } catch (error) {
      console.error("GET request failed:", error);
    }
  };

  // Update the state when input values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // store user data using API POST request
  const storeUserData = async (data) => {
    try {
      await fetch("https://backend-answer-keys.onrender.com/add-one-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          country_name: data.country,
          email: data.email,
          bio: data.bio,
        }),
      });
    } catch (error) {
      console.error("POST request failed:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // function call for POST request here!
    storeUserData(formData);

    // reset the form to empty state
    setFormData({
      name: "",
      email: "",
      country: "",
      bio: "",
    });
  };

  useEffect(() => {
    getUserNewestInfo();
  }, []);
 
  return (
    // Main container for the countries section
    <div className="countries-container">

      {/* Title of the section */}
      <h1>Saved Countries</h1>

      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Welcome back, {newUserName}</h2>
        <h2>My Profile</h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="country"
          placeholder="Your Country"
          value={formData.country}
          onChange={handleInputChange}
          required
        />

        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows="4"
        />

        <button type="submit">Submit</button>
      </form>

      {/* Conditional rendering:
          If there are no saved countries, show a message.
          Otherwise, map through the array and display each country. */}
      <div>
        {/* Check if the savedCountries array is empty */}
        {countries.length === 0 ? (
          // If empty, show this message
          <p>No saved countries yet.</p>
        ) : (
          // Otherwise, loop through the savedCountries array
          countries.map((country) => (
            // Each country card (key must be unique for React rendering)
            <div key={country.cca3} className="card">

              {/* Country flag image */}
              <img
                src={country.flags?.png}
                alt={country.name.common} // accessibility label
              />

              {/* Country name */}
              <h2>{country.name.common}</h2>

              {/* Country region (e.g., Europe, Asia) */}
              <p>{country.region}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SavedCountries;