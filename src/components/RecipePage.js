import "../css/recipePage.css"
import PriceTable from "./PriceTable";
import DisplayMethod from "./DisplayMethod";

function RecipePage(props) {

    return (
        <>
        <div className="homefood left rPage">
            <PriceTable recipe={props.recipe}></PriceTable>
        </div>
        <span className="methodContainer">
            <h1>Method</h1>
            <ol className="method">
                <DisplayMethod method={props.recipe?.method}/>
            </ol>
        </span>
        </>
    )
}

export default RecipePage;