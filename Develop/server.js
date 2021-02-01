const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// Initializing the app and poret
const app = express();
const PORT = process.env.PORT || 3000;

// Setting up body parsing and encoding, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => res.send(db));

app.post("/api/notes", (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };
  db.push(newNote);
  res.send(newNote);
});

app.delete("/api/notes/:id", ( req, res) => {
  const reqNoteID = req.params.id;
  db.forEach((note) => {
    if (reqNoteID === note.id) {
      var noteIndex = db.indexOf(note);
      db.splice(noteIndex, 1);
    }
  });
  res.send(db);
});

app.listen(PORT, (err, req, res) => {
  console.log(`Server listening on http://localhost:3000`);
});
