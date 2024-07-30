import Test6 from './pages/Recipe/test6.js';
import Test5 from './pages/Recipe/test 5.js';
import Test4 from './pages/Recipe/test4.js';
import Test from './pages/Recipe/test.js';
import Spaghetti from './pages/Recipe/Spaghetti.js';
import ChickenRice from './pages/Recipe/ChickenRice.js';
import HoneyChicken from './pages/Recipe/HoneyChickenRiceandPotato.js';
import './css/App.css';
import Nav from './components/Nav.js';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js'
import Recipes from './pages/Recipes.js'
import RecipeMaker from './pages/RecipeMaker.js';
import EditRecipe from './pages/EditRecipe';
import { useState, useEffect } from 'react';
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
        <Route path="/Recipes/Test6" element={<Test6 Recipe={Data.length > 0 ? Data[0].recipes[6] : []}/>} />
        <Route path="/Recipes/Test5" element={<Test5 Recipe={Data.length > 0 ? Data[0].recipes[5] : []}/>} />
        <Route path="/Recipes/Test4" element={<Test4 Recipe={Data.length > 0 ? Data[0].recipes[4] : []}/>} />
        <Route path="/Recipes/Test" element={<Test Recipe={Data.length > 0 ? Data[0].recipes[3] : []}/>} />
        <Route path="/Recipes/HoneyChickenRiceandPotato" element={<HoneyChicken Recipe={Data.length > 0 ? Data[0].recipes[2] : []}/>}/>
        <Route path="/Recipes/ChickenRice" element={<ChickenRice Recipe={Data.length > 0 ? Data[0].recipes[1] : []}/>}/>
        <Route path="/Recipes/Spaghetti" element={<Spaghetti Recipe={Data.length > 0 ? Data[0].recipes[0] : []}/>}/>
        <Route path="/" element={<Home Recipes={Data.length > 0 ? Data[0].recipes : []} />}/>
        <Route path="/Recipes" element={<Recipes Recipes={Data.length > 0 ? Data[0].recipes : []}/>}/>
        <Route path="/RecipeMaker" element={<RecipeMaker Data={Data.length > 0 && Data}/>}/>
        <Route path="/EditRecipe/:id" element={<EditRecipe></EditRecipe>} />
      </Routes>
    </div>
  );
}

export default App;
