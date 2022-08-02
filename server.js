// require neccessary modules
const express = require('express');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./data/notes.json')

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});