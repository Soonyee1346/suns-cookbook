import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipePage from "../../components/RecipePage";
import '../../css/recipePage.css';
import deleteRecipe from "../../api/deleteRecipe";

function Recipe({ Recipe, onDelete}) {
    const navigate = useNavigate();

    const deleteEvent = async () => {
        try {
            await deleteRecipe(Recipe.id);
            onDelete();
            navigate('/Recipes')
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const editRecipe = () => {
        // Implement edit recipe functionality
    };

    return (
        <>
            <h1>{Recipe.name}</h1>
            <div className="recipes">
                <RecipePage recipe={Recipe}/>
            </div>
            <div className="buttons">
                <button className="recipeButton edit" onClick={editRecipe}><i className="fa fa-pen-to-square" aria-hidden="true"></i></button>
                <button className="recipeButton delete" onClick={deleteEvent}><i className="fa fa-trash-can" aria-hidden="true"></i></button>
            </div>
        </>
    )
}

export default Recipe;
