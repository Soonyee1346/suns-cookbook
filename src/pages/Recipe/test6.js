import React from 'react';
import RecipePage from "../../components/RecipePage";
import '../../css/recipePage.css';
import deleteRecipe from "../../api/deleteRecipe"; // Import as default
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function Recipe(props) {

    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const recipeId = props.Recipe ? props.Recipe.id : '3';

    const deleteEvent = async () => {
        try {
            await deleteRecipe(props.Recipe.id);
            setShouldNavigate(true);
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/Recipes');
        }
    }, [shouldNavigate, navigate]);

    return (
        <>
            <h1>{props.Recipe.name}</h1>
            <div className="recipes">
                <RecipePage recipe={props.Recipe}/>
            </div>
            <div className="buttons">
                <Link to={`/EditRecipe/${recipeId}`}><button className="recipeButton edit"><i className="fa fa-pen-to-square" aria-hidden="true"></i></button></Link>
                <button className="recipeButton delete" onClick={deleteEvent}><i className="fa fa-trash-can" aria-hidden="true"></i></button>
            </div>
        </>
    )
}

export default Recipe;
