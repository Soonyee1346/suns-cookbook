import { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditRecipe() {

    const { id } = useParams();

    const [recipe, setRecipe] = useState({})    
    const navigate = useNavigate();
    const [ingNum, setIngNum] = useState(0)
    const [methodNum, setmethodNum] = useState(0)
    const [imageName, setImage] = useState("")

    function inputExistingInfo() {
        var ingList = document.getElementById("ingList");
        var name = document.getElementById('name');
        name.value = recipe.name;
        var img = document.getElementById('outputImg')
        img.src = `/images/${imageName}`

        for(var num = 0; num < ingNum; num++){
            var innerDiv = document.createElement('div');
            innerDiv.id = `ing${num+1}`

            var ingInput = document.createElement('input')
            ingInput.type = "text";
            ingInput.id=`ingredient${num+1}`;
            ingInput.value = recipe.ingredients[num].ingredient

            var quantityInput = document.createElement('input')
            quantityInput.type = "text";
            quantityInput.id=`quantity${num+1}`;
            quantityInput.value = recipe.ingredients[num].quantity

            innerDiv.appendChild(ingInput)
            innerDiv.appendChild(quantityInput)
            ingList.appendChild(innerDiv)
        }

    }

    function fetchRecipe() {
        // fetch all recipes
        axios.get('http://localhost:3001/recipes.json')
        .then(response => {
            const foundRecipe = response.data[0].recipes.find(recipe => recipe.id === parseInt(id));
            setRecipe(foundRecipe)
            setImage(foundRecipe.img)
        })
        .catch(error => {
          console.error('There was an error fetching the recipe', error);
        });
    }

    useEffect(() => {
        if (id) {
            fetchRecipe();
            inputExistingInfo();
        }
    }, [id]);

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
        navigate('/Recipes')
    }

    function formatData() {
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
            <h1>Edit {recipe.name}</h1>
            <form onSubmit={submitRecipe}>
                <div className="container">
                    <div className="name section">
                        <h3>Recipe Name</h3>
                        <input type="text" id="name" placeholder="Recipe Name" required />
                    </div>
                    <div className="image section">
                        <h3>Recipe Image</h3>
                        <input type="file" id="image" style={{ display: 'none' }} required />
                        <button type="button" onClick={handleFileInputClick}>Change Image</button>
                        <br></br><img id="outputImg"></img>
                    </div>
                    <div className="ingredientssection">
                        <h3>Ingredients</h3>
                        <div id="ingList">
                        </div>
                    </div>
                    <button type="button" className="addIng"><i className="fa-solid fa-plus" onClick={addIng}></i></button>
                    <div className="methodssection">
                        <h3>Methods</h3>
                        <div id="methodList">
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

export default EditRecipe