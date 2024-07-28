const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3001;
const multer = require('multer')

app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Route to serve recipes.json
app.get('/recipes.json', (req, res) => {
    const filePath = path.join(__dirname, 'recipes.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            res.status(500).send('Error reading the file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// POST upload new Recipe and images

const storage = multer.diskStorage({
    destination: '../public/images/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

function newRecipePage(fileName, callback) {
    const templatePath = path.join(__dirname, '../src/pages/Recipe/RecipeTemplate.js');
    const pagePath = path.join(__dirname, `../src/pages/Recipe/${fileName}.js`);

    fs.copyFile(templatePath, pagePath, (err) => {
        if (err) {
            console.error('Error duplicating template:', err);
            callback(err);
        } else {
            console.log(`Template duplicated as ${fileName}.js`);
            callback(null, pagePath);
        }
    });
}

function formatName(str) {
    var name = (`${str || ""}`).replace(/\s+/g, '');
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function importApp(recipeName, id, callback) {
    const appPath = path.join(__dirname, `../src/App.js`);
    const name = formatName(recipeName)
    const importStatement = `import ${name} from './pages/Recipe/${recipeName}.js';\n`;

    fs.readFile(appPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        const newRoute = `
        <Route path="/Recipes/${name}" element={<${name} Recipe={Data.length > 0 ? Data[0].recipes[${id}] : []}/>} />
        `;

        // Find the position where to insert the newRoute
        const routesIndex = data.indexOf('<Routes>');
        const insertionIndex = data.indexOf('\n', routesIndex) + 1;

        // Insert the newRoute
        const updatedContent = importStatement + data.slice(0, insertionIndex) + newRoute + data.slice(insertionIndex);

        fs.writeFile(appPath, updatedContent, 'utf8', (writeErr) => {
            if (writeErr) {
                return callback(writeErr);
            }
            callback(null);
        });
    })
}

function removeOldImportAndFile(id, callback) {
    fs.readFile('recipes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            res.status(500).send('Error reading the file');
            return;
        }

        let recipesData = JSON.parse(data);
        let recipe = recipesData[0].recipes.find(recipe => recipe.id === parseInt(id));
        let name = recipe.name;
        const formattedName = formatName(recipe.name);
        const appPath = path.join(__dirname, `../src/App.js`);
        const oldFilePath = path.join(__dirname, `../src/pages/Recipe/${recipe.name}.js`);

        //remove Import Statement
        const importRegex = new RegExp(`import ${formattedName} from './pages/Recipe/${name}.js';\\n`, 'g');
        const updatedContent = data.replace(importRegex, '');

        // Remove the old route
        const routeRegex = new RegExp(`<Route path="/Recipes/${formattedName}"[^>]*></Route>\\n`, 'g');
        const finalContent = updatedContent.replace(routeRegex, '');

        fs.writeFile(appPath, finalContent, 'utf8', (writeErr) => {
            if (writeErr) {
                return callback(writeErr);
            }

            // Delete the old file
            fs.unlink(oldFilePath, (unlinkErr) => {
                if (unlinkErr && unlinkErr.code !== 'ENOENT') {
                    return callback(unlinkErr);
                }

                callback(null);
            });
        });
    });
}

app.post('/RecipeMaker', upload.single('image'), (req, res) => {
    const newRecipe = JSON.parse(req.body.recipeData);
    newRecipe.img = req.file ? req.file.filename : 'default.jpg';

    newRecipePage(newRecipe.name,(err, newFilePath) => {
        if (err) {
            console.error('Error duplicating template:', err);
            return res.status(500).send('Error duplicating template');
        }

        
        importApp(newRecipe.name, newRecipe.id, (err, newFilePath) => {
            if (err) {
                console.error('Error amending App.js:', err);
                return res.status(500).send('Error amending App.js');
            }

            fs.readFile('recipes.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading the file:', err);
                    res.status(500).send('Error reading the file');
                    return;
                }

                let recipesData = JSON.parse(data);

                recipesData[0].count = parseInt(recipesData[0].count) + 1;
                let recipes = recipesData[0].recipes;

                // Append the new recipe
                recipes.push(newRecipe);

                // Write the updated JSON back to the file
                fs.writeFile('recipes.json', JSON.stringify(recipesData, null, 2), 'utf8', (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing to the file:', writeErr);
                        res.status(500).send('Error writing to the file');
                        return;
                    }

                    res.send('Recipe added successfully');
                });
            });
        });
    });
});

app.post('/EditRecipe', upload.single('image'), (req, res) => {
    const newRecipe = JSON.parse(req.body.recipeData);
    newRecipe.img = req.file ? req.file.filename : req.body.existingImage;

    removeOldImportAndFile(newRecipe.id, (err) => {
        if (err) {
            console.error('Error removing old import and file:', err);
            return res.status(500).send('Error removing old import and file');
        }

        newRecipePage(newRecipe.name,(err, newFilePath) => {
            if (err) {
                console.error('Error duplicating template:', err);
                return res.status(500).send('Error duplicating template');
            }

            
            importApp(newRecipe.name, newRecipe.id, (err, newFilePath) => {
                if (err) {
                    console.error('Error amending App.js:', err);
                    return res.status(500).send('Error amending App.js');
                }

                fs.readFile('recipes.json', 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading the file:', err);
                        res.status(500).send('Error reading the file');
                        return;
                    }

                    let recipesData = JSON.parse(data);

                    recipesData[0].count = parseInt(recipesData[0].count);
                    let recipes = recipesData[0].recipes;

                    const recipeIndex = recipes.findIndex(recipe => recipe.id === newRecipe.id);

                    if (recipeIndex === -1){
                        return res.status(404).send('Recipe not found');
                    }

                    // Append the new recipe
                    recipes[recipeIndex] = newRecipe;

                    // Write the updated JSON back to the file
                    fs.writeFile('recipes.json', JSON.stringify(recipesData, null, 2), 'utf8', (writeErr) => {
                        if (writeErr) {
                            console.error('Error writing to the file:', writeErr);
                            res.status(500).send('Error writing to the file');
                            return;
                        }

                        res.send('Recipe added successfully');
                    });
                });
            });
        });
    });
});

app.post('/api/deleteRecipe', (req,res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send({ error: 'Recipe ID is required' });
    }

    fs.readFile('recipes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            res.status(500).send('Error reading the file');
            return;
        }

        try {
            let recipesData = JSON.parse(data);
            recipesData[0].count = parseInt(recipesData[0].count) - 1;
            let recipes = recipesData[0].recipes;

            const recipeIndex = recipes.findIndex(recipe => recipe.id === id);

            if (recipeIndex === -1) {
                return res.status(404).send({ error: 'Recipe not found' });
            }

            recipes = recipes.filter(recipe => recipe.id !== id);
            recipesData[0].recipes = recipes

            // Write the updated JSON back to the file
            fs.writeFile('recipes.json', JSON.stringify(recipesData, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to the file:', writeErr);
                    res.status(500).send('Error writing to the file');
                    return;
                }

                res.send('Recipe removed successfully');
            })
        } catch (parseErr) {
            console.error('Error parsing JSON data:', parseErr);
            res.status(500).send({ error: 'Error parsing JSON data' });
        }
    })
}) 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});