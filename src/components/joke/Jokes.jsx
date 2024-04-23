import React, { useState } from 'react';

const ChuckNorrisJoke = () => {
  // Initialize joke property in component's state to an empty string
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
      <button onClick={fetchRandomJoke}>Get Random Joke</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {joke && (
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginTop: '10px' }}>
          <p>{joke}</p>
        </div>
      )}
    </div>
  );
};

export default ChuckNorrisJoke;
