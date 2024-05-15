import spaghetti from "../images/spaghetti.jpeg" //find a way to make this dynamic ya. Pass down props
import '../css/tables.css'

function PriceTable(props) {
    return (
        <><a className="recipelink" href="Recipes/Spaghetti.html"><img src={spaghetti}/></a>
        <span className="ingredients">
        <h2>{props.recipe.name}</h2>
        <table className="priceTable">
            <tr>
                <th>Ingredients</th>
                <th>RRP</th>
                <th>Current Price</th>
            </tr>
            <tr>
                <td>Pasta</td>
                <td><s>$3.00</s></td>
                <td>$2.00</td>
            </tr>
            <tr>
                <td>Minced Meat</td>
                <td></td>
                <td>$5.00</td>
            </tr>
            <tr>
                <td>Pasta Sauce</td>
                <td><s>$4.50</s></td>
                <td>$3.00</td>
            </tr>
            <tr>
                <td>Garlic</td>
                <td></td>
                <td>$2.00</td>
            </tr>
            <tr>
                <td>Onion</td>
                <td></td>
                <td>$1.50</td>
            </tr>
            <tr>
                <th>Total</th>
                <th>$2.50</th>
                <th>$13.50</th>
            </tr>
        </table>
    </span></>
    )
}

export default PriceTable;