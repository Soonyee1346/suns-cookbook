import { useState } from 'react'

function RecipeMaker() {

    const [ingNum, setIngNum] = useState(1)
    var ingList

    function addIng() {
        var currentIng = ingNum + 1
        var ingList = document.getElementById("ingList");
        var innerDiv = document.createElement('div');

        var ingInput = document.createElement('input')
        ingInput.type = "text";
        ingInput.id=`ingredient${currentIng}`;
        ingInput.value = "ingredient";

        
        innerDiv.id = `ing${currentIng}`

        innerDiv.appendChild(ingInput)
        ingList.appendChild(innerDiv)
        //setIngNum(ingNum + 1)
    }

    return (
        <>
            <h1>RecipeMaker</h1>
            <div className="container">
                <div className="name section">
                    <h3>Recipe Name</h3>
                    <input type="text" id="name" value="Recipe Name"/>
                </div>
                <div className="image section">
                    <h3>Recipe Image</h3>
                    <input type="file" id="image"/>
                </div>
                <div className="ingredients section">
                    <h3>Ingredients</h3>
                    <div id="ingList">
                        <div id="ing1">
                            <input type="text" id="ingredient1" value="ingredient"/>
                            <input type="text" id="quantity1" value="quantity"/>
                        </div>
                    </div>
                </div>
                <button className="addIng"><i className="fa-solid fa-plus" onClick={addIng}></i></button>
            </div>
        </>
    )
}

export default RecipeMaker