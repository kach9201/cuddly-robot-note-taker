const express = require('express')
const router = express.Router()
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require("../helpers/uuid")

//GET /api/notes reads the db.json file and return all saved notes as JSON
router.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
})
    
//POST /api/notes receives a new notes to save on the request body and add it to the db.json file, 
    //and then returns the new note to the client
    //each note has a unique id when it's saved
router.post('/', (req, res) => {
    console.info(`${req.method} request received to post note`);
    const { title, text } = req.body

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
console.log(newNote)
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json("Error in posting note")
    }
})

//DELETE /api/notes/:id receives a query parameter containing the id of the note in order to delete. 
    //In order to delete a note, read all notes from the db.json file, remove the note with the given property,
    //and then rewrite all the notes to the db.json file
    router.delete('/:id', (req, res) => {
        readFromFile('./db/db.json')
        .then((data) => {
           let currentNotes = JSON.parse(data);
           currentNotes = currentNotes.filter((note)=> 
           note.id !== req.params.id
           )
           writeToFile( './db/db.json', currentNotes);
           res.json(currentNotes)
        })
    })

 module.exports = router;