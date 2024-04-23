import React, { useState, useEffect } from 'react';

const CategoryList = ({ onCategorySelect }) => {
  // State variables to manage categories data, loading state, and errors
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false); // State variable to track whether to display categories

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

  // Function to toggle the display of categories
  const toggleShowCategories = () => {
    setShowCategories(!showCategories);
  };

  // Render loading spinner while fetching, error message if error occurs, and dropdown menu for category selection
  return (
    <div>
        <h3>Get a list of all Joke Categories here!</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Button to toggle the display of categories */}
      <button onClick={toggleShowCategories}>
        {showCategories ? 'Hide All Joke Categories' : 'View All Joke Categories'}
      </button>
      {/* Display categories if showCategories is true */}
      {showCategories && (
        <div>
          {categories.map((category, index) => (
            <button key={index} onClick={() => onCategorySelect(category)}>
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
