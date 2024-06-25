import './css/App.css';
import Nav from './components/Nav.js';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js'
import Recipes from './pages/Recipes.js'
import RecipeMaker from './pages/RecipeMaker.js';
//import Data from './data.json'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [Data, setData] = useState([])

  useEffect(() => {
    fetchRecipes();
  }, [])

  function fetchRecipes() {
    axios.get('http://localhost:3001/recipes.json')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the recipes', error);
      });
  }

  return (
    <div className="App">
      <Nav />
      <div className="topdivider"></div>
      <Routes>
        <Route path="/" element={<Home Recipes={Data.length > 0 ? Data[0].recipes : []} />}/>
        <Route path="/Recipes" element={<Recipes Recipes={Data.length > 0 ? Data[0].recipes : []}/>}/>
        <Route path="/RecipeMaker" element={<RecipeMaker Count={Data.length > 0 && Data[0].count}/>}/>
      </Routes>
    </div>
  );
}
//<h1>{Data.length > 0 && Data[0].count}</h1>

export default App;
