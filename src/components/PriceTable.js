import '../css/tables.css'
import React, { useState, useEffect } from 'react';

function PriceTable(props) {

    const [imgSrc, setImgSrc] = useState("")

    useEffect(() => {
        const importImage = async () => {
            try{
                const image = await import (`../images/${props.recipe.img}`);
                setImgSrc(image.default);
            }
            catch(error) {
                console.error('Error loading image:', error);
            }
        }
        importImage();
    },[props.recipe.img]);

    function createTable(ingArray) {
        let table = "";
        let totalSaved = 0;
        let total = 0;
        ingArray.forEach((ing) => {
            var same = true;
            if(ing.rrp !== ing.price){
                same = false;
                totalSaved += ing.rrp - ing.price
            }

            table += `<tr><td>${ing.name}</td><td>${same ? "" : `<s>${ing.rrp}</s>`}</td><td>${ing.price}</td></tr>`

            total += ing.price
        });

        table += `<tr><td>Total</td><td>${totalSaved}</td><td>${total}</td></tr>`

        return table;
    }

    return (
        <><a className="recipelink" href="./pages/Recipes/Spaghetti.html"><img src={imgSrc}/></a>
        <span className="ingredients">
        <h2>{props.recipe.name}</h2>
        <table className="priceTable">
            <tr>
                <th>Ingredients</th>
                <th>RRP</th>
                <th>Current Price</th>
            </tr>
            ${createTable(props.recipe.ingredients)}
        </table>
    </span></>
    )
}

export default PriceTable;