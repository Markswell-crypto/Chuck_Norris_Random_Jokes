import React, { useState } from 'react';
import Jokes from './components/jokes/Jokes';
import Category from './components/categories/Category';
import CategoryList from './components/categoryList/CategoryList';
import './App.css'; 
import logo from './assets/chucknorris.png'

const App = () => {
  // State variable to manage the theme
  const [theme, setTheme] = useState('green');

  // Function to toggle between green and purple themes
  const toggleTheme = () => {
    setTheme(theme === 'green' ? 'purple' : 'green');
  };

  // Function to generate flickering effect for title
  const flickerTitle = () => {
    const title = document.getElementById('app-title');
    title.classList.add('flicker');
    setTimeout(() => {
      title.classList.remove('flicker');
    }, 2000); // Remove flicker effect after 2 seconds
  };

  // Render the App component with styled elements
  return (
    <div className={`app-container ${theme}`}>
      <div className='header-container'>
      <img src={logo} alt="Logo" className="logo" />
      <h1 id="app-title" onClick={flickerTitle}>
        CHUCK NORRIS JOKES
        <span role="img" aria-label="laughing emoji">😆</span>
        <span role="img" aria-label="winking emoji">😉</span>
      </h1>
      <button className="theme-button" onClick={toggleTheme}>
        {theme === 'green' ? 'Switch to Purple Theme' : 'Switch to Green Theme'}
      </button>
      </div>
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
