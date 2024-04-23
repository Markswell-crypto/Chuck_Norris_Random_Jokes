import React, { useState, useEffect } from 'react';

const Category = () => {
  // State variables to manage joke data, loading state, errors, and selected category
  const [joke, setJoke] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // State variable to store categories
  const [selectedCategory, setSelectedCategory] = useState(''); // State variable to store selected category

  // Function to fetch categories from the Chuck Norris API
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data); // Update categories state with fetched data
    } catch (error) {
      setError(error.message);
    }
  };

  // useEffect hook to fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to handle category selection
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setJoke(''); // Clear joke display when a new category is selected
    setError(null); // Clear error message when a new category is selected
  };

  // Function to fetch Chuck Norris joke by selected category
  const fetchJokeByCategory = async () => {
    if (!selectedCategory) {
      setError('Please select a category first!'); 
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`);
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <h3>Get Jokes based on category here!</h3>
      {/* Dropdown menu to select category */}
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {/* Map through categories to render options */}
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {/* Button to fetch joke by selected category */}
      <button onClick={fetchJokeByCategory}>Get Joke by Category</button>

      {/* Render loading spinner while fetching, error message if error occurs, and joke if available */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {joke && <p>{joke}</p>}
    </div>
  );
};

export default Category;
