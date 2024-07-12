import { useState, useEffect } from 'react'
import axios from 'axios'

function RecipeMaker(props) {

    const [ingNum, setIngNum] = useState(1)
    const [recipes, setRecipes] = useState([])
    const [methodNum, setmethodNum] = useState(1)
    const count = props.Data && props.Data.length > 0 ? props.Data[0].count : 0;

    useEffect(() => {
        if (props.Data && props.Data.length > 0) {
            const { count, recipes } = props.Data[0];
            setRecipes(recipes);
        }
    }, [props.Data]);

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

    function addMethod() {
        var currentMethod = methodNum + 1
        var methodList = document.getElementById("methodList");
        var innerDiv = document.createElement('div');
        innerDiv.id = `meth${currentMethod}`

        var methodInput = document.createElement('input')
        methodInput.type = "text";
        methodInput.id=`method${currentMethod}`;
        methodInput.placeholder="method"

        innerDiv.appendChild(methodInput)
        methodList.appendChild(innerDiv)
        setmethodNum(methodNum + 1)
    }

    function handleFileInputClick() {
        document.getElementById('image').click();
    }

    function submitRecipe() {
        var recipeData = formatData();
        const formData = new FormData();
        formData.append('image', document.getElementById('image').files[0]);
        formData.append('recipeData', JSON.stringify(recipeData));

        axios.post('http://localhost:3001/RecipeMaker', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            // Optionally fetch updated recipes after submission
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    function formatData() {
        const id = count
        const name = document.getElementById("name").value
        let ingredients = []
        let method = []
        
        for(let i=1; i <= ingNum; i++){
            let ingredient = document.getElementById(`ingredient${i}`).value
            let quantity = document.getElementById(`quantity${i}`).value
            ingredients.push({ingredient, quantity})
        }

        for(let i=1; i <= methodNum; i++){
            let steps = document.getElementById(`method${i}`).value
            method.push(steps)
        }

        return { id, name, ingredients, method }
    }

    return (
        <>
            <h1>RecipeMaker</h1>
            <form onSubmit={submitRecipe}>
                <div className="container">
                    <div className="name section">
                        <h3>Recipe Name</h3>
                        <input type="text" id="name" placeholder="Recipe Name" required />
                    </div>
                    <div className="image section">
                        <h3>Recipe Image</h3>
                        <input type="file" id="image" style={{ display: 'none' }} required />
                        <button type="button" onClick={handleFileInputClick}>Upload Image</button>
                    </div>
                    <div className="ingredientssection">
                        <h3>Ingredients</h3>
                        <div id="ingList">
                            <div id="ing1">
                                <input type="text" id="ingredient1" placeholder="ingredient" required />
                                <input type="text" id="quantity1" placeholder="quantity" required />
                            </div>
                        </div>
                    </div>
                    <button type="button" className="addIng"><i className="fa-solid fa-plus" onClick={addIng}></i></button>
                    <div className="methodssection">
                        <h3>Methods</h3>
                        <div id="methodList">
                            <div id="meth1">
                                <input type="text" id="method1" placeholder="method" required />
                            </div>
                        </div>
                    </div>
                    <button type="button" className="addMethod"><i className="fa-solid fa-plus" onClick={addMethod}></i></button>
                    <br></br><br></br>
                    <button className="submit" type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}

export default RecipeMaker