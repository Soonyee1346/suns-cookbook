import { useState, useEffect } from 'react'
import axios from 'axios'

function RecipeMaker() {

    const [ingNum, setIngNum] = useState(1)
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetchRecipes();
    }, [])

    function fetchRecipes() {
        axios.get('http://localhost:3001/recipes.json')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the recipes', error);
            });
    }

    function addIng() {
        var currentIng = ingNum + 1
        var ingList = document.getElementById("ingList");
        var innerDiv = document.createElement('div');
        innerDiv.id = `ing${currentIng}`

        var ingInput = document.createElement('input')
        ingInput.type = "text";
        ingInput.id=`ingredient${currentIng}`;
        ingInput.placeholder="ingredient"


        var quantityInput = document.createElement('input')
        quantityInput.type = "text";
        quantityInput.id=`quantity${currentIng}`;
        quantityInput.placeholder="quantity"

        innerDiv.appendChild(ingInput)
        innerDiv.appendChild(quantityInput)
        ingList.appendChild(innerDiv)
        setIngNum(ingNum + 1)
    }

    function handleFileInputClick() {
        document.getElementById('image').click();
    }

    function submitRecipe() {
        console.log("hi")
        var recipeData = formatData();

        axios.post('http://localhost:3001/RecipeMaker', recipeData)
            .then(response => {
                console.log(response.data);
                fetchRecipes();  // Fetch updated recipes after submission
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        console.log("bye")
    }

    function formatData() {
        const id = "3"
        const name = document.getElementById("name").value
        const img = "chickenrice.jpg"
        let ingredients = []
        
        for(let i=1; i < ingNum + 1; i++){
            let ingredient = document.getElementById(`ingredient${i}`).value
            let quantity = document.getElementById(`quantity${i}`).value
            let ing = {ingredient, quantity}
            ingredients.push(ing)
        }

        let recipeData = {id, name, img, ingredients}

        return recipeData
    }

    return (
        <>
            <h1>RecipeMaker</h1>
            <div className="container">
                <div className="name section">
                    <h3>Recipe Name</h3>
                    <input type="text" id="name" placeholder="Recipe Name"/>
                </div>
                <div className="image section">
                    <h3>Recipe Image</h3>
                    <input type="file" id="image" style={{ display: 'none' }} />
                    <button type="button" onClick={handleFileInputClick}>Upload Image</button>
                </div>
                <div className="ingredients section">
                    <h3>Ingredients</h3>
                    <div id="ingList">
                        <div id="ing1">
                            <input type="text" id="ingredient1" placeholder="ingredient"/>
                            <input type="text" id="quantity1" placeholder="quantity"/>
                        </div>
                    </div>
                </div>
                <button className="addIng"><i className="fa-solid fa-plus" onClick={addIng}></i></button>
                <button className="submit" onClick={submitRecipe}>Submit</button>
                <div id="data"></div>
            </div>
        </>
    )
}

export default RecipeMaker