import '../css/tables.css'
import React, { useState, useEffect } from 'react';

function PriceTable(props) {

    const img = `/images/${props.recipe.img}`

    function createTable(ingArray) {
        const rows = [];
        let saved = 0;
        let total = 0;
        let row

        for (let i = 0; i < ingArray.length; i++) {
            const ing = ingArray[i];
            row = (
                <tr key={i}>
                    <td>{ing.name}</td>
                    <td><s>{ing.rrp !== ing.price ? `$${ing.rrp}` : ''}</s></td>
                    <td>${ing.price}</td>
                </tr>
            );
            saved += (ing.rrp - ing.price)
            total += ing.price
            rows.push(row);
        }

        row = (<tr key={ingArray.length}>
        <td>Total</td>
        <td><s>${saved}</s></td>
        <td>${total}</td>
        </tr>)

        rows.push(row)
    
        return rows;
    }

    return (
        <><a className="recipelink" href="./pages/Recipes/Spaghetti.html"><img src={img}/></a>
        <span className="ingredients">
        <h2>{props.recipe.name}</h2>
        <table className="priceTable" id="priceTable">
            <thead>
                <tr>
                    <th>Ingredients</th>
                    <th>RRP</th>
                    <th>Current Price</th>
                </tr>
            </thead>
            <tbody>
                {createTable(props.recipe.ingredients)}
            </tbody>
        </table>
        <div className="priceLine"></div>
    </span></>
    )
}

export default PriceTable;