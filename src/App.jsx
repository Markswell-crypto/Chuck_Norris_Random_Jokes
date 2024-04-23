import React, { useState } from 'react';
import Jokes from './components/jokes/Jokes';
import Category from './components/categories/Category';
import CategoryList from './components/categoryList/CategoryList';
import './App.css'; 

const App = () => {
  // State variable to manage theme
  const [theme, setTheme] = useState('green');

  // Function to toggle theme between green and yellow
  const toggleTheme = () => {
    setTheme(theme === 'green' ? 'yellow' : 'green');
  };

  return (
    <div className={`app-container ${theme}`}>
      {/* Title with blinking effect and emojis */}
      <h1 className="title">
        <span role="img" aria-label="laughing face">😆</span>
        CHUCK NORRIS JOKES
        <span role="img" aria-label="winking face">😉</span>
      </h1>
      {/* Button to toggle theme */}
      <button className="theme-button" onClick={toggleTheme}>Change Theme</button>
      
      {/* Components */}
      <Jokes />
      <br />
      <Category />
      <br />
      <CategoryList />
      <br />
    </div>
  );
};

export default App;
