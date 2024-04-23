import React, { useState } from 'react';
import JokeSearch from './components/jokeSearch/JokeSearch';
import Jokes from './components/jokes/Jokes';


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <JokeSearch onSearch={handleSearch} />
      <Jokes searchQuery={searchQuery} />
    </div>
  );
};

export default App;
