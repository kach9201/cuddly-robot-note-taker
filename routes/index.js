const express = require("express");

//Imports modular routers for notes
const notes = require("./notes")

const router = express.Router()

router.use('/api/notes', notes)

module.exports = router;