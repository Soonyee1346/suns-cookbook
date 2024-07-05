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
            row = (
                //Fix this after you've finished making the Recipe Pages
                <Link className="box" to="../pages/Recipe/recipeTemplate" key={key}>
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