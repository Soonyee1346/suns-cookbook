import RecipePage from "../../components/RecipePage"
import '../../css/recipePage.css';

function Recipe(props) {

    return (
        <>
            <h1>{props.Recipe.name}</h1>
            <div className="recipes">
                <RecipePage recipe={props.Recipe}/>
            </div>
        </>
    )
}

export default Recipe