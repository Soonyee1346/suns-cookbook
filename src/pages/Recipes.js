import Tiles from "../components/RecipeTiles"


function Recipes() {

    const spaghetti = {
        name: "Spaghetti",
        img: "spaghetti.jpeg",
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
        }],
        get totalPrice() {
            return this.ingredients.reduce((total, ingredient) => total + ingredient.price, 0).toFixed(2);
        }
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
        }],
        get totalPrice() {
            return this.ingredients.reduce((total, ingredient) => total + ingredient.price, 0).toFixed(2);
        }
    }

    const recipeArr = [spaghetti, chickenRice, spaghetti]

    return (
        <>
            <h1>Recipes</h1>
            <div className="recipes">
                <Tiles recipeArr={recipeArr}/>
            </div>
        </>
    )
}

export default Recipes