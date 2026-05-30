import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../App.css";

// Function that displays a list of saved countries
function SavedCountries({ countries = [] }) {

  // State form imputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  // create a state variable to hold the new user info
  const [newUserName, setNewUserName] = useState(null);

  // state variable for saved countries from backend
  const [savedCountries, setSavedCountries] = useState([]);

  // write a function, use async await, use try... catch, fetch request
  const getUserNewestInfo = async () => {
    try {

      const response = await fetch(
        "api/get-newest-user"
      );

      const data = await response.json();

      // safe access to avoid crashing if API is empty
      setNewUserName(data?.[0]?.name || null);

    } catch (error) {
      console.error("GET request failed:", error);
    }
  };

  // GET saved countries from backend
  const fetchSavedCountries = async () => {
    try {

      const response = await fetch(
        "api/get-all-saved-countries"
      );

      // convert response into JSON
      const data = await response.json();

      // save into state
      setSavedCountries(data);

    } catch (error) {
      console.error("GET saved countries failed:", error);
    }
  };


   const toggleSavedCountry = async (countryName) => {

    const isSaved = savedCountries.some(
      (country) => country.country_name === countryName
    );

    try {

      if (isSaved) {

        // remove country
        setSavedCountries(
          savedCountries.filter(
            (country) => country.country_name !== countryName
          )
        );

      } else {

        // add country
        setSavedCountries([
          ...savedCountries,
          { country_name: countryName },
        ]);
      }

    } catch (error) {
      console.error("Toggle failed:", error);
    }
  };



  // Update the state when input values change
  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // store user data using API POST request
  const storeUserData = async (data) => {
    try {

      await fetch(
        "api/add-one-user",
        {
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
        }
      );

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

  // run when component loads
  useEffect(() => {


    fetchSavedCountries();
    getUserNewestInfo();


  }, []);

  return (

  <div className="countries-container">

    {/* PROFILE FORM */}
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

      <button type="submit">
        Submit
      </button>

    </form>

    {/* SAVED COUNTRIES SECTION */}
    <div className="saved-countries-section">

      <h2>My Saved Countries</h2>

      {savedCountries.length === 0 ? (
        <p>No saved countries yet.</p>
      ) : (
        savedCountries.map((country, index) => (
        <div key={index} className="card">

  <div className="country-card-header">

    <h2>{country.country_name}</h2>

    <button
      type="button"
      className="heart-btn"
      onClick={() => toggleSavedCountry(country.country_name)}
    >
      {savedCountries.some(
        (saved) => saved.country_name === country.country_name
      ) ? (
        <FaHeart className="heart-icon saved" />
      ) : (
        <FaRegHeart className="heart-icon" />
      )}
    </button>

  </div>

</div>
        ))
      )}

    </div>

  </div>
);
};

export default SavedCountries;
