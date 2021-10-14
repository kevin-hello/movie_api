const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const morgan = require("morgan"),
  app = express(),
  mongoose = require("mongoose"),
  Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

const { escapeRegExp, rest } = require("lodash");

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));

app.use(bodyParser.json());

// access documentation.html using express.static function
app.use(express.static("public"));

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my movie API!");
});

//Get the list of ALL movies

app.get("/movies", (req, res) => {
  Movies.find().then((movies) => {
    res.status(201).json(movies);
  });
});

//Get list of all users (this isn't asked for in the app ,but is helpful to see if a user info was updated or de-registered )
app.get("/users", (req, res) => {
  Users.find().then((users) => {
    res.status(201).json(users);
  });
});

//get data about a single movie by title

app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title }).then((movie) => {
    res.json(movie);
  });
});

//get a description about a genre by genre name

app.get("/genres/:Name", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.Name }).then((genre) => {
    res.json(genre.Genre);
  });
});

//get data about a single director by name

app.get("/directors/:Name", (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Name }).then((director) => {
    res.json(director.Director);
  });
});

// Register a new user
//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username }).then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      }).then((user) => {
        res.status(201).json(user);
      });
    }
  });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Add a movie to a user's list of favorites
app.post("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//remove a movie from a user's list
app.delete("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Delete a user by username
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username }).then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  });
});

// error handling

app.use((err, req, res, next) => {
  try {
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + error);
  }
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
