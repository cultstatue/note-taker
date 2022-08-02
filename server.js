// require neccessary modules
const express = require('express');
const fs = require('fs');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const uniqid = require('uniqid'); 
const { notes } = require('./data/notes.json')

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

function createNewNote(body, notesArray) {

    const note = body;
    notesArray.push(note);

    fs.writeFileSync(

        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )
  
    return note;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;

}

function deleteNote(note, notesArray) {

    // const index = notesArray.findIndex(noteObject => {
    //     return noteObject.id = note.id
    // })

    const index = notesArray.indexOf(note);

    notesArray.splice(index, 1);

    fs.writeFileSync(

        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )
}
app.delete('/api/notes/:id', (req, res) =>{

    const note = findById(req.params.id, notes);

    deleteNote(note, notes);

    console.log(note)

})
app.post('/api/notes', (req, res) => {

    req.body.id = uniqid();

    const note = createNewNote(req.body, notes);

    res.json(note);

});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});