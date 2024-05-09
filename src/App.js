import './css/App.css';
import Nav from './components/Nav.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js'
//import Recipes from './pages/Recipes.js'
//import RecipeMaker from './pages/RecipeMaker.js'

function App() {
  return (
    <div className="App">
      <Nav/>
      <div class="topdivider"></div>
      <Home />
    </div>
  );
}

export default App;
