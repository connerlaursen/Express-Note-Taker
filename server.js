const express = require("express");
const fs  = require("fs");
const path = require("path");
let toDo = require('./db/db.json');
const uuid = require("./helper/uuid")
//set port
const PORT = process.env.PORT || 3001;
//initialize app
const app = express();

//middleware
app.use(express.urlencoded( { extended: true}));
app.use(express.json());
app.use(express.static('public'));
const root = {root:path.join(__dirname, "./public")}

app.get('/notes', (req, res) => {
    res.sendFile(
      "notes.html", root
    );
  });

  app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {

      if (err) {

        res.status(500).send(err)
        return
    
      }

      let notes = JSON.parse(data)
    res.send(notes)
  })});

  app.post("/api/notes", (req, res) => {

    fs.readFile("./db/db.json", "utf8", (err, data) => {

      if (err) {

        res.status(500).send(err)
        return
    
      }
      console.log(data)
      let notes = JSON.parse(data)
      const {title, text} = req.body;
      const toDo = {

        title: title,
        text: text,
        id: uuid()
      }
      notes.push(toDo);
      // notes.push(req.body)

      fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
        console.log(notes)
        res.send(notes);
      })
    })
  });

  

app.delete("api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {

    if (err) {
      res.status(500).send(err)
      return
    }

  let notes = JSON.parse(data)
  let note = notes.find(note => {
    note.id === req.params.id
  })
  notes.splice(note, 1)

  fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err) =>
  {
    if (err) {

      res.status(500).send(err)
      res.send("note deleted")
  
    }
  })
  
  })
  

})

app.listen(PORT, () =>{

    console.log(`Server live on port ${PORT}`)
});
