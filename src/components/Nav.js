import logo from '../images/logo.gif';
import '../css/Nav.css';

function Nav() {
    return (
    <nav className="nav-bar">
      <ul>
          <li className="page"><a href="../pages/Recipes.js" className="barlogo barCat"><img src={logo}/></a></li>
          <li className="page"><a className="barCat" href="">Recipes</a></li>
          <li className="page"><a className="barCat" href="">Make a Recipe</a></li>
      </ul>
    </nav>
    )
  }

export default Nav;