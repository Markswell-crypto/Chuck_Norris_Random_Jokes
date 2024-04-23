import React, { useState } from 'react';
import Jokes from './components/jokes/Jokes';
import Category from './components/categories/Category';
import CategoryList from './components/categoryList/CategoryList';


const App = () => {

  return (
    <div>
      <Jokes/>
      <Category />
      <CategoryList />
    </div>
  );
};

export default App;
