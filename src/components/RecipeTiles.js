import '../css/tiles.css'
import { Link } from "react-router-dom"

function RecipeTiles(props) {

    function createTiles(recipeArr){
        const rows = [];
        let row
    
        for (let i = 0; i < recipeArr.length; i++) {
            const tile = recipeArr[i];
            const img = `/images/${tile.img}`
            const key = `tile${i}`
            const name = (`${recipeArr[i].name || ""}`).replace(/\s+/g, '');
            const linkTo = `/Recipes/${name}`
            row = (
                <Link className="box" to={linkTo} key={key}>
                        <img src={img} alt={tile.name}/>
                        <h1 className="boxtitle bold">{tile.name}</h1>
                </Link>
            );
            rows.push(row);
        }
    
        return rows;
    
    }

    return (
        <>{createTiles(props.recipes)}</>
    )
}

export default RecipeTiles