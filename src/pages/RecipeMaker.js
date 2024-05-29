function RecipeMaker() {

    function addIng() {
        var ingList = document.getElementById("ingList");

        ingList.appendChild() //idk about this method bro
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
                <button className="addIng"><i class="fa-solid fa-plus" onClick={addIng()}></i></button>
            </div>
        </>
    )
}

export default RecipeMaker