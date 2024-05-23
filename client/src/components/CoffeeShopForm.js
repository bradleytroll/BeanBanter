import React, { useState, useEffect } from 'react';

const CoffeeShopForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 0,
    review: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value, 10) : value,  // Convert rating to an integer
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Coffee Shop Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="location"
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
      <input
        name="rating"
        type="number"
        min="1"
        max="5"
        placeholder="Rating"
        value={formData.rating}
        onChange={handleChange}
      />
      <textarea
        name="review"
        placeholder="Review"
        value={formData.review}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CoffeeShopForm;
