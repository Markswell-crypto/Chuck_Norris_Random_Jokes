import React, { useState } from 'react';

// Component to fetch and display a random Chuck Norris joke
const Jokes = () => {
  // State variables to manage joke data, loading state, and errors
  const [joke, setJoke] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch a random Chuck Norris joke
  const fetchRandomJoke = async () => {
    // Set loading state to true while fetching data
    setLoading(true);
    // Clear any previous error messages
    setError(null);
    try {
      // Make API request to fetch a random Chuck Norris joke
      const response = await fetch('https://api.chucknorris.io/jokes/random');
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
      <button onClick={fetchRandomJoke}>Get Random Joke</button>
    </div>
  );
};

export default Jokes;
