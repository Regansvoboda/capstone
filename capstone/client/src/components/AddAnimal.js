import React, { useState } from 'react';

const AddAnimalForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [animalData, setAnimalData] = useState({
    name: '',
    species: '',
    date_tag: '',
    start_loc: '',
    last_ping: '',
    size: '',
    type: '',
    image: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAnimalData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Make the POST request to the backend API endpoint
    fetch('http://127.0.0.1:5555/animals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(animalData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle any response or perform necessary actions after successful submission
      console.log('Animal added successfully:', data);
    })
    .catch(error => {
      // Handle any error during submission
      console.error('Error adding animal:', error);
    });

    // Reset the form fields
    setAnimalData({
      name: '',
      species: '',
      date_tag: '',
      start_loc: '',
      last_ping: '',
      size: '',
      type: '',
      image: ''
    });

    // Hide the form after submission
    setShowForm(false);
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={animalData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Species:
            <input
              type="text"
              name="species"
              value={animalData.species}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Date Tagged:
            <input
              type="text"
              name="date_tag"
              value={animalData.date_tag}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Starting Location:
            <input
              type="text"
              name="start_loc"
              value={animalData.start_loc}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Last Ping:
            <input
              type="text"
              name="last_ping"
              value={animalData.last_ping}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Size:
            <input
              type="text"
              name="size"
              value={animalData.size}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              name="type"
              value={animalData.type}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={animalData.image}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Add New Animal</button>
      )}
    </div>
  );
};

export default AddAnimalForm;
