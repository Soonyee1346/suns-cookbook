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

app.post('/RecipeMaker', upload.single('image'), (req, res) => {
    const newRecipe = JSON.parse(req.body.recipeData);
    newRecipe.img = req.file ? req.file.filename : 'default.jpg';

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});