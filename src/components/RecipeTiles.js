import '../css/tiles.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

function createTiles(recipeArr){
    const rows = [];
    let row

    for (let i = 0; i < recipeArr.length; i++) {
        const tile = recipeArr[i];
        const img = `./images/${tile.img}`
        const key = `tile${i}`
        console.log(img)
        row = (
            <Link className="box" to="/Recipes/Spaghetti.html" key={key}>
                    <img src={img} />
                    <h1 className="boxtitle bold">Spaghetti</h1>
                    <h1 className="boxprice bold">$13.50</h1>
            </Link>
        );
        rows.push(row);
    }

    return rows;


}


function recipeTiles(props) {

    return (
        <>{createTiles(props.recipeArr)}</>
    )
}

export default recipeTiles