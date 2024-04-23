import React, { useState, useEffect } from 'react';

// Component to fetch and display a list of Chuck Norris joke categories
const CategoryList = () => {
  // State variables to manage categories data, loading state, and errors
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // Render loading spinner while fetching, error message if error occurs, and list of categories if available
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
