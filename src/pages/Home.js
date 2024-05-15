import '../css/Home.css';
import PriceTable from '../components/PriceTable.js';

function Home() {
    const spaghetti = {
        name: "Spaghetti",
        img: "Spaghetti.jpeg"
    }

    const chickenRice = {
        name: "Chicken Rice",
        img: "chickenrice.jpg"
    }

    const recipeArr = [spaghetti, chickenRice]
    return (
        <>  
            <h1 className="bold">Most Discounted Meals This Week</h1>
            <div className="homefood left">
                <PriceTable recipe={recipeArr[0]}/>
            </div>
            <div className="homefood right">
                <PriceTable recipe={recipeArr[1]}/>
            </div>
            <div className="homefood left">
                <PriceTable recipe={recipeArr[0]}/>
            </div>
        </>
    )
  }

  export default Home;