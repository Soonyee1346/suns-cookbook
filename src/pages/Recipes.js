import Tiles from "../components/RecipeTiles"


function Recipes(props) {

    return (
        <>
            <h1>Recipes</h1>
            <div className="recipes">
                <Tiles recipes={props.Data}/>
            </div>
        </>
    )
}

export default Recipes