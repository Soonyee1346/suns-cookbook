import '../css/Home.css';
import PriceTable from '../components/PriceTable.js';

function Home() {
    const spaghetti = {
        name: "Spaghetti",
        img: "Spaghetti.jpeg",
        ingredients: [{
            name: "Pasta",
            rrp: 3,
            price: 2
        }, {
            name: "Minced Meat",
            rrp: 5,
            price: 5
        }, {
            name: "Pasta Sauce",
            rrp: 4,
            price: 3
        }, {
            name: "Garlic",
            rrp: 2,
            price: 2
        }, {
            name: "Onion",
            rrp: 1.5,
            price: 1.5
        }]
    }

    const chickenRice = {
        name: "Chicken Rice",
        img: "chickenrice.jpg",
        ingredients: [{
            name: "Pasta",
            rrp: 3,
            price: 2
        }, {
            name: "Minced Meat",
            rrp: 5,
            price: 5
        }, {
            name: "Pasta Sauce",
            rrp: 4,
            price: 3
        }, {
            name: "Garlic",
            rrp: 2,
            price: 2
        }, {
            name: "Onion",
            rrp: 1.5,
            price: 1.5
        }]
    }

    const recipeArr = [spaghetti, chickenRice, spaghetti]
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
                <PriceTable recipe={recipeArr[2]}/>
            </div>
        
        </>
    )
  }

  export default Home;