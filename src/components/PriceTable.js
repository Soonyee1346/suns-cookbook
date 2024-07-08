import '../css/tables.css'
import { Link } from "react-router-dom"

function PriceTable(props) {

    const img = `/images/${props.recipe?.img || ""}`;
    const name = (`${props.recipe?.name || ""}`).replace(/\s+/g, '');
    const linkTo = `/Recipes/${name}`;

    function createTable(ingArray) {
        const rows = [];
        let row

        for (let i = 0; i < ingArray.length; i++) {
            const ing = ingArray[i];
            row = (
                <tr key={i}>
                    <td>{ing.ingredient}</td>
                    <td>{ing.quantity}</td>
                </tr>
            );
            rows.push(row);
        }
    
        return rows;
    }

    return (
        <><Link className="recipelink" to={linkTo}><img src={img} alt="recipeImg"/></Link>
        <span className="ingredients">
        <h2>{props.recipe?.name || ""}</h2>
        <table className="priceTable" id="priceTable">
            <thead>
                <tr>
                    <th>Ingredients</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {createTable(props.recipe?.ingredients || "")}
            </tbody>
        </table>
        <div className="priceLine"></div>
        </span></>
    )
}

export default PriceTable;