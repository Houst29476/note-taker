// ----- Dependencies ------ //
const express = require('express');
const path = require("path");
let dbJSON = require("./db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

// ----- Setup Express App ----- //
const app = express();
const PORT = process.env.PORT || 3000;

// ------ Sets up Express app to handle data parsing ------- //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// ------- API Routes ------- //
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.json(dbJSON);
});

app.post("/api/notes", function (req, res) {
    if (!req.body.title) {
        return res.json({ error: "Missing required title" });
    }

    const note = { ...req.body, id: uuidv4() }

    dbJSON.push(note);


    fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(dbJSON), (err) => {
        if (err) {
            return res.json({ error: "Error writing to file" });
        }
            return res.json(note);
    });
});

// ----- Starts server ----- //
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});