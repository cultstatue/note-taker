const fs = require('fs');
const path = require("path");

// function to create a new note
function createNewNote(body, notesArray) {

    const note = body;
    notesArray.push(note);

    fs.writeFileSync(

        path.join(__dirname, '../data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )
  
    return note;
}

// function to find a note by id
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;

}

// function to delete a note
function deleteNote(note, notesArray) {

    const index = notesArray.indexOf(note);

    notesArray.splice(index, 1);

    fs.writeFileSync(

        path.join(__dirname, '../data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )
}

module.exports = {

    createNewNote,
    findById,
    deleteNote
    
};