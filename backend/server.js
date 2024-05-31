const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/RecipeMaker', (req, res) => {
    const newRecipe = req.body;

    fs.readFile('recipes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            res.status(500).send('Error reading the file');
            return;
        }

        let recipes = JSON.parse(data);

        // Append the new recipe
        recipes.push(newRecipe);

        // Write the updated JSON back to the file
        fs.writeFile('recipes.json', JSON.stringify(recipes, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to the file:', writeErr);
                res.status(500).send('Error writing to the file');
                return;
            }

            res.send('Recipe added successfully');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});