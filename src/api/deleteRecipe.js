import axios from 'axios';

const deleteRecipe = async (id) => {
    try {
        const response = await axios.post('http://localhost:3001/api/deleteRecipe', { id }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Recipe deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting the recipe:', error);
        throw error;
    }
};

export default deleteRecipe;