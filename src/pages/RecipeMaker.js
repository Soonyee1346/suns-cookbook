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
        ingInput.placeholder="ingredient"


        var quantityInput = document.createElement('input')
        quantityInput.type = "text";
        quantityInput.id=`quantity${currentIng}`;
        quantityInput.placeholder="quantity"

        
        innerDiv.id = `ing${currentIng}`

        innerDiv.appendChild(ingInput)
        innerDiv.appendChild(quantityInput)
        ingList.appendChild(innerDiv)
        setIngNum(ingNum + 1)
    }

    function handleFileInputClick() {
        document.getElementById('image').click();
    }

    function passData() {
        let dataArr = []
        for(let i=1; i < ingNum + 1; i++){
            dataArr[i-1] = document.getElementById(`ingredient${i}`).value
        }

        displayData(dataArr)
    }

    function displayData(dataArr) {
        var dataDiv = document.getElementById("data");
        let string = ""

        for(let i=0; i < dataArr.length; i++){
            string += dataArr[i]
        }

        dataDiv.innerHTML = string
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
                <button className="submit" onClick={passData}>Submit</button>
                <div id="data"></div>
            </div>
        </>
    )
}

export default RecipeMaker