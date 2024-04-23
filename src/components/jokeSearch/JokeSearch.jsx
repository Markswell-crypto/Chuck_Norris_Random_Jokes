import React, { useState } from 'react';
import Modal from './modal/Modal';

const JokeSearch = ({ onSearch }) => {
  // State variables for managing search query and modal visibility
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle changes in the search input field
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Function to handle the search button click
  const handleSearch = () => {
    // Call the onSearch function passed as a prop and pass the search query
    onSearch(query);
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Render the JokeSearch component
  return (
    <div>
      <input
        type="text"
        placeholder="Enter keyword"
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Render the Modal component */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Render the search query inside the Modal */}
        <div style={{ padding: '20px' }}>
          <h2>Search Query: {query}</h2>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </div>
  );
};

export default JokeSearch;
