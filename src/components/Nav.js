import '../css/Nav.css';
import { Link } from "react-router-dom"

function Nav() {
    return (
    <nav className="nav-bar">
      <ul>
          <li className="page"><Link to="/" className="barlogo barCat"><img src="/images/logo.gif" alt="logo"/></Link></li>
          <li className="page"><Link className="barCat" to="/Recipes">Recipes</Link></li>
          <li className="page"><Link className="barCat" to="/RecipeMaker">Make a Recipe</Link></li>
      </ul>
    </nav>
    )
  }

export default Nav;