import {useState} from "react";
// Functional React component that displays a list of saved countries
function SavedCountries({ savedCountries = [] }) {
  // State fro frorm imputs 
  const [formData, setFormData]= useState ({
    name:"'", 
    email:"",
    country:"",
    bio:"",
  })
 // Handle input changes 
const handleChange = ({target: {name,value}}) => {
  setFormData((prev) => ({...prev,[name]: value }));

};
// handle submit 
const handleSubmit = (e) =>
{
  e.preventDefault();
  console.log(formData);
  setFormData(initalForm); //rest
};

  return (

    // Main container for the countries section
    <div className="countries-container">
     
      {/* Title of the section */}
      <h1>Saved Countries</h1>
 <form className="profile-form" onSubmit={handleSubmit}>
        <h2>My Profile</h2>

        <input
         type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="country"
          placeholder="Your Country"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          rows="4"
        />

        <button type="submit">Submit</button>


      </form>
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