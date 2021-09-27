const express = require("express"),
  morgan = require("morgan");

const app = express();

app.use(morgan("common"));

// express.static function
app.use(express.static("public"));

// ten favorite movie (example)
let faveMovies = [
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
  },
  {
    title: "A Space Odyssey",
    director: "Stanley Kubrick",
  },
  {
    title: "Goodfellas",
    director: "Martin Scorsese",
  },
  {
    title: "Catch Me If You Can",
    director: "Steven Spielberg",
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
  },
  {
    title: "Spirited Away",
    director: "Hayao Miyazaki",
  },
  {
    title: "The Good, the Bad and the Ugly",
    director: "Sergio Leone",
  },
  {
    title: "Finding Nemo",
    director: "Lee Unkrich",
  },
  {
    title: "Avatar",
    director: "James Cameron",
  },
  {
    title: "A Beautiful Mind",
    director: "Ron Howard",
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my movie API!");
});

app.get("/movies", (req, res) => {
  res.json(faveMovies);
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// error handling

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
