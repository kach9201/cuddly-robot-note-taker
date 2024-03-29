const express = require('express');
const path = require('path');
const routes = require('./routes');


const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//HTML routes
//GET /notes returns the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

//GET * returns the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.use(routes)

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);