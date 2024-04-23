import React from 'react';
import Jokes from './components/jokes/Jokes';
import Category from './components/categories/Category';
import CategoryList from './components/categoryList/CategoryList';


const App = () => {

  return (
    <div>
      <br></br>
      <Jokes/>
      <br></br>
      <Category />
      <br></br>
      <CategoryList />
      <br></br>
    </div>
  );
};

export default App;
