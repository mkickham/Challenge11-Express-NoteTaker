const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

router.get('/api/notes', async (req, res) => {
    const dbJSON = await JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(dbJSON);
});

router.post('/api/notes', async (req,res) => {
    const dbJSON = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const feedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJSON.push(feedback);
    fs.writeFileSync("db/db.json", JSON.stringify(dbJSON));
    res.json(dbJSON);
});

router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync("db/db.json", "utf8");
    const dataJSON = JSON.parse(data);
    const newNote = dataJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json", JSON.stringify(newNote));
    res.json("Your note has been deleted")
    console.log(newNote);
});

module.exports = router;