import '../css/tiles.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

function RecipeTiles(props) {

    function createTiles(recipeArr){
        const rows = [];
        let row
    
        for (let i = 0; i < recipeArr.length; i++) {
            const tile = recipeArr[i];
            const img = `/images/${tile.img}`
            const key = `tile${i}`
            console.log(img)
            row = (
                <Link className="box" to="/Recipes/Spaghetti.html" key={key}>
                        <img src={img} />
                        <h1 className="boxtitle bold">{tile.name}</h1>
                        <h1 className="boxprice bold">{tile.totalPrice}</h1>
                </Link>
            );
            rows.push(row);
        }
    
        return rows;
    
    
    }

    return (
        <>{createTiles(props.recipeArr)}</>
    )
}

export default RecipeTiles