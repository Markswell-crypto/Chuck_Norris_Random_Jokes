import React, { useState } from 'react';
import JokeSearch from '../jokeSearch/JokeSearch';

const Jokes = () => {
  // Initialize state variables for random joke, searched jokes, error, and loading
  const [randomJoke, setRandomJoke] = useState('');
  const [searchedJokes, setSearchedJokes] = useState([]);
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
        throw new Error('Failed to fetch random joke');
      }
      // Parse response body as JSON
      const data = await response.json();
      // Update random joke state with fetched joke value
      setRandomJoke(data.value);
    } catch (error) {
      // If an error occurs during fetching, set error state with error message
      setError(error.message);
    } finally {
      // Set loading state to false after fetching is complete (either success or failure)
      setLoading(false);
    }
  };

  // Function to fetch Chuck Norris joke by keyword
  const fetchJokeByKeyword = async (keyword) => {
    // Set loading state to true while fetching data
    setLoading(true);
    // Clear any previous error messages
    setError(null);
    try {
      // If the keyword is empty, clear the searched jokes display
      if (!keyword) {
        setSearchedJokes([]);
        return;
      }
      // Make API request to fetch Chuck Norris jokes by keyword
      const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${keyword}`);
      // Check if response is successful (status code 200-299)
      if (!response.ok) {
        // If response is not successful, throw an error
        throw new Error('Joke not found!');
      }
      // Parse response body as JSON
      const data = await response.json();
      // Update searched jokes state with fetched joke values
      setSearchedJokes(data.result.map((result) => result.value));
    } catch (error) {
      // If an error occurs during fetching, set error state with error message
      setError(error.message);
    } finally {
      // Set loading state to false after fetching is complete (either success or failure)
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Section for displaying searched jokes */}
      <div>
        <h3>Search for a joke here!</h3>
        <JokeSearch onSearch={fetchJokeByKeyword} />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {/* Display only the first five searched jokes */}
        {searchedJokes.slice(0, 5).map((joke, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginTop: '10px' }}>
            <p>{joke}</p>
          </div>
        ))}
        {/* Display a button to view the rest of the jokes if there are more than five */}
        {searchedJokes.length > 5 && <button onClick={() => setSearchedJokes(searchedJokes.slice(5))}>View More Jokes</button>}
        {/* Clear the display when search box is empty */}
        {searchedJokes.length === 0 && <p>Enter a keyword to search.</p>}
      </div>
      
      {/* Section for displaying random joke */}
      <div>
        <h3>Get a Random Joke Here!</h3>
        <button onClick={fetchRandomJoke}>Get Random Joke</button>
        {randomJoke && (
          <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginTop: '10px' }}>
            <p>{randomJoke}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jokes;
