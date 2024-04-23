import React, { useState, useEffect } from 'react';
import Modal from './modal/Modal'; 

const CategoryList = ({ onCategorySelect }) => {
  // State variables to manage categories data, loading state, and errors
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state variable for modal visibility

  // useEffect hook to fetch categories data when the component mounts
  useEffect(() => {
    // Function to fetch categories data
    const fetchCategories = async () => {
      // Set loading state to true while fetching data
      setLoading(true);
      // Clear any previous error messages
      setError(null);
      try {
        // Make API request to fetch categories
        const response = await fetch('https://api.chucknorris.io/jokes/categories');
        // Check if response is successful (status code 200-299)
        if (!response.ok) {
          // If response is not successful, throw an error
          throw new Error('Failed to fetch categories');
        }
        // Parse response body as JSON
        const data = await response.json();
        // Update categories state with fetched data
        setCategories(data);
      } catch (error) {
        // If an error occurs during fetching, set error state with error message
        setError(error.message);
      } finally {
        // Set loading state to false after fetching is complete (either success or failure)
        setLoading(false);
      }
    };

    // Call fetchCategories function when the component mounts
    fetchCategories();
  }, []);

  // Function to handle category selection
  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Render loading spinner while fetching, error message if error occurs, and dropdown menu for category selection
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <select value={selectedCategory} onChange={handleCategorySelect}>
        <option value="">Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {selectedCategory && (
        <div>
          {/* Button to open the modal */}
          <button onClick={openModal}>Get Joke</button>
          {/* Render the Modal component */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {/* Render the selected category and button to close the modal */}
            <div style={{ padding: '20px' }}>
              <h2>Selected Category: {selectedCategory}</h2>
              <button onClick={closeModal}>Close Modal</button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
