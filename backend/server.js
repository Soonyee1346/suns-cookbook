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

function formatName(str) {
    var name = (`${str || ""}`).replace(/\s+/g, '');
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function newRecipePage(recipeName, callback) {
    const templatePath = path.join(__dirname, '../src/pages/Recipe/RecipeTemplate.js');
    const fileName = formatName(recipeName);
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

function importApp(recipeName, id, callback) {
    const appPath = path.join(__dirname, `../src/App.js`);
    const name = formatName(recipeName)
    const importStatement = `import ${name} from './pages/Recipe/${name}.js';\n`;

    fs.readFile(appPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        const newRoute = `<Route path="/Recipes/${name}" element={<${name} Recipe={Data.length > 0 ? Data[0].recipes[getRecipeIndex(${id})] : []}/>} />`;

        // Find the position where to insert the newRoute
        const routesIndex = data.indexOf('<Routes>');
        const insertionIndex = data.indexOf('\n', routesIndex) + 1;

        // Insert the newRoute
        const beforeInsertion = data.slice(0, insertionIndex);
        const afterInsertion = data.slice(insertionIndex);
        const updatedContent = importStatement + beforeInsertion + '        ' + newRoute.trim() + '\n' + afterInsertion;
        
        fs.writeFile(appPath, updatedContent, 'utf8', (writeErr) => {
            if (writeErr) {
                return callback(writeErr);
            }
            callback(null);
        });
    })
}

function removeOldImportAndFile(id, deleteOldImage, callback) {
    fs.readFile('recipes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            res.status(500).send('Error reading the file');
            return;
        }

        console.log("made it")
 
        let recipesData = JSON.parse(data);
        let recipe = recipesData[0].recipes.find(recipe => recipe.id === parseInt(id));
        let name = recipe.name;
        let oldImage = recipe.img
        const formattedName = formatName(name);
        const appPath = path.join(__dirname, `../src/App.js`);
        const oldFilePath = path.join(__dirname, `../src/pages/Recipe/${formattedName}.js`);
        
        fs.readFile(appPath, 'utf8', (err, appData) => {
            if (err) {
                return callback(err);
            }

            //remove Import and Route Statement
            const importRoute = `import ${formattedName} from './pages/Recipe/${formattedName}.js';`
            const oldRoute = `<Route path="/Recipes/${formattedName}" element={<${formattedName} Recipe={Data.length > 0 ? Data[0].recipes[getRecipeIndex(${id})] : []}/>} />`
            const updatedContent = appData.split('\n').filter(line => line.trim() !== importRoute.trim() && line.trim() !== oldRoute.trim()).join('\n');

            fs.writeFile(appPath, updatedContent, 'utf8', (writeErr) => {
                if (writeErr) {
                    return callback(writeErr);
                }

                // Delete the old image
                if(deleteOldImage){
                    const oldImagePath = path.join(__dirname, `../public/images/${oldImage}`);
                    fs.unlink(oldImagePath, (unlinkErr) => {
                        if (unlinkErr && unlinkErr.code !== 'ENOENT') {
                            return callback(unlinkErr);
                        }
                    });
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
    });
}

function EditRecipe(newRecipe, callback) {
    fs.readFile('recipes.json', 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }

        let recipesData = JSON.parse(data);

        let recipes = recipesData[0].recipes;

        const recipeIndex = recipes.findIndex(recipe => parseInt(recipe.id) === newRecipe.id);

        if (recipeIndex === -1){
            return callback('Recipe not found');
        }

        // Append the new recipe
        recipes[recipeIndex] = newRecipe;

        // Write the updated JSON back to the file
        fs.writeFile('recipes.json', JSON.stringify(recipesData, null, 2), 'utf8', (writeErr) => {
            
            if (writeErr) {
                console.error('Error ammending Recipe:', writeErr);
                return callback('Error ammending recipes.json');
            }
            else {
                console.log('recipes.json ammended')
                callback(null);
            }
        });
    });
}

function removeRecipe (deleteId, callback) {
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

            const recipeIndex = recipes.findIndex(recipe => recipe.id === deleteId);

            if (recipeIndex === -1) {
                return res.status(404).send({ error: 'Recipe not found' });
            }

            recipes = recipes.filter(recipe => recipe.id !== deleteId);
            recipesData[0].recipes = recipes

            // Write the updated JSON back to the file
            fs.writeFile('recipes.json', JSON.stringify(recipesData, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error deleting recipe from recipes:', writeErr);
                    callback('Error deleting recipe from recipes');
                    return;
                }
                callback(null)
            })
        } catch (parseErr) {
            console.error('Error parsing JSON data:', parseErr);
            callback({ error: 'Error parsing JSON data' });
        }
    })
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
    var deleteOldImage = false;

    if(req.file) {
        deleteOldImage = true;
        newRecipe.img = req.file.filename
    }
    else {
        newRecipe.img = req.body.existingImage
    }

    newRecipe.id = parseInt(newRecipe.id)

    removeOldImportAndFile(newRecipe.id, deleteOldImage, (err) => {
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

                EditRecipe(newRecipe, (err) => {
                    if (err) {
                        console.error('Error ammending Recipe:', err);
                        return res.status(500).send('Error ammending Recipe');
                    }
                });
            });
        });
    });
});

app.post('/api/deleteRecipe', (req,res) => {
    const { id } = req.body;
    const deleteOldImage = true;

    if (!id) {
        return res.status(400).send({ error: 'Recipe ID is required' });
    }

    removeOldImportAndFile(id, deleteOldImage, (err) => {
        if (err) {
            console.error('Error removing old import and file:', err);
            return res.status(500).send('Error removing old import and file');
        }
        removeRecipe(id, (err) => {
            if (err) {
                console.error('Error removing old recipe from recipe.json:', err);
                return res.status(500).send('Error removing old recipe from recipe.json');
            }
        })
    })
}) 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});