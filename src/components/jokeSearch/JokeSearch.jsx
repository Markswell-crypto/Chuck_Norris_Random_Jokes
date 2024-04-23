import React, { useState } from 'react';
import './jokeSearch.css'; // Import CSS file for styling

const JokeSearch = ({ onSearch }) => {
  // State variable to store the search query
  const [query, setQuery] = useState('');

  // Function to handle changes in the search input field
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Function to handle the search button click
  const handleSearch = () => {
    // Call the onSearch function passed as a prop and pass the search query
    onSearch(query);
  };

  // Render an input field for entering search keywords and a button to trigger the search
  return (
    <div className="joke-search-container">
      <input
        type="text"
        placeholder="Enter keyword"
        value={query}
        onChange={handleInputChange}
        className="joke-search-input"
      />
      <button onClick={handleSearch} className="joke-search-button">Search</button>
    </div>
  );
};

export default JokeSearch;
