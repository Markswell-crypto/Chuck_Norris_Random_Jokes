import React, { useState } from 'react';

const JokeDisplay = () => {
  // Initialize joke property in component's state to an empty string
  const [joke, setJoke] = useState('');

  // Render the Chuck Norris joke data
  return (
    <div>
      <p>{joke}</p>
    </div>
  );
};

export default JokeDisplay;
