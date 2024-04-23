import React, { useState } from 'react';

// Component to fetch and display Chuck Norris jokes by category
const Category = ({ category }) => {
  // State variables to manage joke data, loading state, and errors
  const [joke, setJoke] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch Chuck Norris joke by category
  const fetchCategory = async () => {
    // Set loading state to true while fetching data
    setLoading(true);
    // Clear any previous error messages
    setError(null);
    try {
      // Make API request to fetch joke by category
      const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
      // Check if response is successful (status code 200-299)
      if (!response.ok) {
        // If response is not successful, throw an error
        throw new Error('Failed to fetch joke');
      }
      // Parse response body as JSON
      const data = await response.json();
      // Update joke state with fetched joke value
      setJoke(data.value);
    } catch (error) {
      // If an error occurs during fetching, set error state with error message
      setError(error.message);
    } finally {
      // Set loading state to false after fetching is complete (either success or failure)
      setLoading(false);
    }
  };

  // Render loading spinner while fetching, error message if error occurs, and joke if available
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {joke && <p>{joke}</p>}
      <button onClick={fetchCategory}>Get Joke by Category</button>
    </div>
  );
};

export default Category;
