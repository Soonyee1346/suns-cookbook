import React from 'react';
import RecipePage from "../../components/RecipePage";
import '../../css/recipePage.css';
import deleteRecipe from "../../api/deleteRecipe"; // Import as default

function Recipe(props) {
    const deleteEvent = async () => {
        try {
            await deleteRecipe(props.Recipe.id);
            
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const editRecipe = () => {
        console.log("hi")
    };

    return (
        <>
            <h1>{props.Recipe.name}</h1>
            <div className="recipes">
                <RecipePage recipe={props.Recipe}/>
            </div>
            <div className="buttons">
                <button className="recipeButton edit" onClick={editRecipe}><i className="fa fa-pen-to-square" aria-hidden="true"></i></button>
                <button className="recipeButton delete" onClick={deleteEvent}><i className="fa fa-trash-can" aria-hidden="true"></i></button>
            </div>
        </>
    )
}

export default Recipe;
