import './css/App.css';
import Nav from './components/Nav.js';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js'
import Recipes from './pages/Recipes.js'
import RecipeMaker from './pages/RecipeMaker.js';

function App() {
  return (
    <div className="App">
      <Nav/>
      <div className="topdivider"></div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Recipes" element={<Recipes />}/>
        <Route path="/RecipeMaker" element={<RecipeMaker />}/>
      </Routes>
    </div>
  );
}

export default App;
