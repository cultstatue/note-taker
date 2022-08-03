const { createNewNote, findById, deleteNote} = require('../../lib/notes')
const { notes } = require('../../data/notes.json')
const uniqid = require('uniqid'); 
const router = require('express').Router();
const path = require('path');


router.get('/notes', (req, res) => {

    res.json(notes);

});

router.delete('/notes/:id', (req, res) =>{

    const note = findById(req.params.id, notes);

    deleteNote(note, notes);

    res.sendFile(path.join(__dirname, '../../public/notes.html'));

})
router.post('/notes', (req, res) => {

    req.body.id = uniqid();

    const note = createNewNote(req.body, notes);

    res.json(note);

});

module.exports = router;