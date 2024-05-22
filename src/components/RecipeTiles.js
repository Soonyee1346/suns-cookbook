import '../css/tiles.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

function createTiles(recipeArr){
    const rows = [];
    let row

    for (let i = 0; i < recipeArr.length; i++) {
        const ing = recipeArr[i];
        row = (
            <Link className="box" to="/Recipes/Spaghetti.html">
                    <img src="images/spaghetti.jpeg" />
                    <h1 class="boxtitle bold">Spaghetti</h1>
                    <h1 class="boxprice bold">$13.50</h1>
            </Link>
        );
        rows.push(row);
    }

    rows.push(row)

    return rows;


}


function recipeTiles(props) {

    return (
        <>{createTiles(props.recipeArr)}</>
    )
}

export default recipeTiles