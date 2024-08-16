import { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/recipeMaker.css';

function EditRecipe() {

    const { id } = useParams();

    const [recipe, setRecipe] = useState({})    
    const navigate = useNavigate();
    const [ingNum, setIngNum] = useState(0)
    const [methodNum, setmethodNum] = useState(0)
    const [imageName, setImage] = useState("")
    const [isPopulated, setIsPopulated] = useState(false);

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

        for(var num1 = 0; num1 < methodNum; num1++){
            var currentMethod = num1 + 1
            var methodList = document.getElementById("methodList");
            innerDiv = document.createElement('div');
            innerDiv.id = `meth${currentMethod}`
    
            var methodInput = document.createElement('input')
            methodInput.type = "text";
            methodInput.id=`method${currentMethod}`;
            methodInput.value = recipe.method[num1]
    
            innerDiv.appendChild(methodInput)
            methodList.appendChild(innerDiv)
            setmethodNum(currentMethod)
        }

    }

    async function fetchRecipe() {
        try {
            const response = await axios.get('http://localhost:3001/recipes.json');
            const foundRecipe = response.data[0].recipes.find(recipe => recipe.id === parseInt(id));
            setRecipe(foundRecipe);
            setImage(foundRecipe.img);
            setIngNum(foundRecipe.ingredients.length);
            setmethodNum(foundRecipe.method.length);
        } catch (error) {
            console.error('There was an error fetching the recipe', error);
        }
    }

    useEffect(() => {
        if (id) {
            fetchRecipe();
        }
    }, [id]);

    useEffect(() => {
        if (Object.keys(recipe).length !== 0 && !isPopulated) {
            inputExistingInfo();
            setIsPopulated(true);
        }
    }, [recipe]);

    function addIng() {
        var currentIng = ingNum + 1
        var ingList = document.getElementById("ingList");
        var innerDiv = document.createElement('div');
        innerDiv.id = `ing${currentIng}`

        var ingInput = document.createElement('input')
        ingInput.type =  "text";
        ingInput.id = `ingredient${currentIng}`;
        ingInput.placeholder = "ingredient";
        ingInput.required = true;


        var quantityInput = document.createElement('input')
        quantityInput.type = "text";
        quantityInput.id=`quantity${currentIng}`;
        quantityInput.placeholder="quantity"
        quantityInput.required = true;

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
        methodInput.required = true;

        innerDiv.appendChild(methodInput)
        methodList.appendChild(innerDiv)
        setmethodNum(methodNum + 1)
    }

    function handleFileInputClick() {
        document.getElementById('image').click();
    }

    function submitRecipe(event) {
        event.preventDefault();
        var recipeData = formatData();
        const formData = new FormData();
        const imageFile = document.getElementById('image').files[0];

        if (imageFile) {
            formData.append('image', imageFile);
        } else {
            formData.append('existingImage', imageName);
        }

        formData.append('recipeData', JSON.stringify(recipeData));

        axios.post('http://localhost:3001/EditRecipe', formData, {
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
            const methodElement = document.getElementById(`method${i}`);

            if (!methodElement) {
                console.error(`Element with ID 'method${i}' not found`);
                continue;
            }
    
            let steps = methodElement.value;
            method.push(steps);
        }

        return { id, name, ingredients, method }
    }

    function handleFileInputChange(event) {
        const imageFile = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            document.getElementById('outputImg').src = e.target.result;
        }

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
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
                        <input type="file" id="image" style={{ display: 'none' }} onChange={handleFileInputChange}/>
                        <button type="button" onClick={handleFileInputClick}>Change Image</button>
                        <br></br><img className="fileImg" id="outputImg" alt="Selected Recipe"></img>
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