import axios from 'axios';

const fetchRecipe = async () => {
    axios.get('http://localhost:3001/recipes.json')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('There was an error fetching the recipes', error);
    });
}

export default fetchRecipe;