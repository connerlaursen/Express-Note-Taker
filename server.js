const express = require("express")
const path = require("path")
//set port
const PORT = process.env.PORT || 3001;
//initialize app
const app = express();

//middleware
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));
const root = {root:path.join(__dirname, "./public")}

app.get('/notes', (req, res) => {
    res.sendFile(
      "notes.html", root
    );
  });

  app.get('/api/notes', (req, res) => {
    res.json([
        {
            title:"Test Title",
            text:"Test text"
        }
    ])
  })



app.listen(PORT, () =>{

    console.log(`Server live on port ${PORT}`)
});
