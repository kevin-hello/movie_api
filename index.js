const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  morgan = require("morgan");

const app = express();

app.use(morgan("common"));

app.use(bodyParser.json());

// express.static function
app.use(express.static("public"));

// movie array
let movies = [
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

let genres = [
  { name: "Thriller", description: "Lorem Ipsum" },
  {
    name: "Action",
    description:
      "Action films usually include high energy, big-budget physical stunts and chases, possibly with rescues, battles, fights, escapes, destructive crises (floods, explosions, natural disasters, fires, etc.), non-stop motion, spectacular rhythm and pacing, and adventurous, often two-dimensional 'good-guy' heroes (or recently, heroines) battling 'bad guys' - all designed for pure audience escapism. Includes the James Bond 'fantasy' spy/espionage series, martial arts films, video-game films, so-called 'blaxploitation' films, and some superhero films.",
  },
  {
    name: "Adventure",
    description:
      "Adventure films are usually exciting stories, with new experiences or exotic locales, very similar to or often paired with the action film genre. They can include traditional swashbucklers or pirate films, serialized films, and historical spectacles (similar to the epics film genre), searches or expeditions for lost continents, 'jungle' and 'desert' epics, treasure hunts, disaster films, or searches for the unknown.",
  },
  {
    name: "Comedy",
    description:
      "Comedies are light-hearted plots consistently and deliberately designed to amuse and provoke laughter (with one-liners, jokes, etc.) by exaggerating the situation, the language, action, relationships and characters. This section describes various forms of comedy through cinematic history, including slapstick, screwball, spoofs and parodies, romantic comedies, black comedy (dark satirical comedy), and more.",
  },
  {
    name: "Crime",
    description:
      "Crime films are developed around the sinister actions of criminals or mobsters, particularly bankrobbers, underworld figures, or ruthless hoodlums who operate outside the law, stealing and murdering their way through life. The criminals or gangsters are often counteracted by a detective-protagonist with a who-dun-it plot. Hard-boiled detective films reached their peak during the 40s and 50s (classic film noir), although have continued to the present day. Therefore, crime and gangster films are often categorized as film noir or detective-mystery films, and sometimes as courtroom/crime legal thrillers - because of underlying similarities between these cinematic forms. This category also includes various 'serial killer' films.",
  },
  {
    name: "Drama",
    description:
      "Dramas are serious, plot-driven presentations, portraying realistic characters, settings, life situations, and stories involving intense character development and interaction. Usually, they are not focused on special-effects, comedy, or action, Dramatic films are probably the largest film genre, with many subsets.",
  },
  {
    name: "Horror",
    description:
      "Horror films are designed to frighten and to invoke our hidden worst fears, often in a terrifying, shocking finale, while captivating and entertaining us at the same time in a cathartic experience. Horror films feature a wide range of styles, from the earliest silent Nosferatu classic, to today's CGI monsters and deranged humans. They are often combined with science fiction when the menace or monster is related to a corruption of technology, or when Earth is threatened by aliens. The fantasy and supernatural film genres are not always synonymous with the horror genre. There are many sub-genres of horror: slasher, splatter, psychological, survival, teen terror, 'found footage,' serial killers, paranormal/occult, zombies, Satanic, monsters, Dracula, Frankenstein, etc.",
  },
];

let directors = [
  {
    name: "Ron Howard",
    bio: "Ronald William Howard is an American film director, producer, and actor. Howard first came to prominence as a child actor, guest-starring in several television series, including an episode of The Twilight Zone.",
    birthYear: "1954",
    deathYear: "N/A",
  },

  {
    name: "Quentin Tarantino",
    bio: "Quentin Jerome Tarantino is an American film director, screenwriter, producer, author, film critic, and actor. His films are characterized by nonlinear storylines, dark humor, stylized violence, extended dialogue, ensemble casts, references to popular culture, alternate history, and neo-noir.",
    birthYear: "1963",
    deathYear: "N/A",
  },

  {
    name: "Steven Speilberg",
    bio: "Steven Allan Spielberg is an American film director, producer, and screenwriter. He began his career in the New Hollywood era, and is currently the most commercially successful director.",
    birthYear: "1946",
    deathYear: "N/A",
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my movie API!");
});

//Get the list of ALL movies

app.get("/movies", (req, res) => {
  res.json(movies);
});

//get data about a single movie by title [case sensitive]

app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

//get a description about a genre by genre name

app.get("/genres/:name", (req, res) => {
  res.json(
    genres.find((genre) => {
      return genre.name === req.params.name;
    })
  );
});

//get data about a single director by name

app.get("/directors/:name", (req, res) => {
  res.json(
    directors.find((director) => {
      return director.name === req.params.name;
    })
  );
});

// Register a new user
let users = [
  {
    id: 1,
    username: "movielover7",
    password: "pass123",
    email: "movielover@gmail.com",
  },
  {
    id: 2,
    username: "movielover8",
    password: "pass124",
    email: "movielover@gmail.com",
  },
];

app.post("/users", (req, res) => {
  let newUser = req.body;
  if (!newUser.username) {
    const message = "Missing 'username' in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//updated a user's info

app.put("/users/:username", (req, res) => {
  let user = users.find((user) => {
    return user.username === req.params.username;
  });

  //additional coding needed here

  res.send(req.params.username + "'s data was updated.");
});

//allow a user to add movies to their list of favorites

app.post("/users/:username/movielist", (req, res) => {
  let movielist = [];

  //additional coding needed here
  res.send("movie has been added to your list");
});

//remove a movie from a user's list

app.delete("/users/:username/movielist/:title", (req, res) => {
  let movielist = movielist.find((title) => {
    return movie.title === req.params.id;
  });

  if (movie) {
    movielist = movielist.filter((obj) => {
      return obj.title !== req.params.title;
    });
    res.status(201).send(req.params.title + "has been deleted from your list.");
  }
});

//Deregister a user

app.delete("/users/:username", (req, res) => {
  let users = users.find((user) => {
    return user.username === req.params.username;
  });

  if (user) {
    users = users.filter((obj) => {
      return obj.username !== req.params.username;
    });
    res.status(201).send(req.params.username + "has been deleted.");
  }
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
