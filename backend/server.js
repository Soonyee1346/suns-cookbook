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

function importApp(recipeName, callback) {
    const appPath = path.join(__dirname, `../src/App.js`);
    const name = formatName(recipeName)
    const importStatement = `import ${name} from './pages/Recipe/${recipeName}.js';\n`;

    fs.readFile(appPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        const newRoute = `
        <Route path="/Recipes/${recipeName}" element={<${name} Recipe={Data.length > 0 ? Data[0].recipes[${recipes.length - 1}] : []}/>} />
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

app.post('/RecipeMaker', upload.single('image'), (req, res) => {
    const newRecipe = JSON.parse(req.body.recipeData);
    newRecipe.img = req.file ? req.file.filename : 'default.jpg';
    console.log("hi")


    newRecipePage(newRecipe.name, (err, newFilePath) => {
        if (err) {
            console.error('Error duplicating template:', err);
            return res.status(500).send('Error duplicating template');
        }

        
        importApp(newRecipe.name, (err, newFilePath) => {
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});