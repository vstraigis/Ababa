const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const db = require("./db");
const authMiddleware = require("./middleware/authMiddleware");
const jwtGenerator = require("./utils/jwtGenerator");
const axios = require("axios");
const {
  registerValidation,
  loginValidation,
  checkValidationResult,
} = require("./middleware/validators");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/check-auth", authMiddleware, (req, res) => {
  res.send({ valid: true });
});

app.post(
  "/register",
  registerValidation,
  checkValidationResult,
  async (req, res) => {
    try {

      const { name, email, password } = req.body;


      const countExisting = await db.user.count({ where: { email: email } });

      if (countExisting > 0) {
        return res.status(401).send("User already exists!");
      }


      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const bcryptPassword = await bcrypt.hash(password, salt);


      const newUser = await db.user.create({
        data: {
          name: name,
          email: email,
          password: bcryptPassword,
        },
      });

      const token = jwtGenerator(newUser.id);

      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error during registration");
    }
  }
);

app.post("/login", loginValidation, checkValidationResult, async (req, res) => {
  try {

    const { email, password } = req.body;


    const countExisting = await db.user.count({ where: { email: email } });

    if (countExisting === 0) {
      return res.status(401).send("User does not exist!");
    }


    const user = await db.user.findUnique({ where: { email: email } });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).send("Password is incorrect!");
    }


    const token = jwtGenerator(user.id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error during login");
  }
});
app.post("/api/favorite", authMiddleware, async (req, res) => {
  try {
    const userid = req.user;
    const { title, imageUrl, releaseDate, rating, overview } = req.body;

    const existingMovie = await db.movie.findFirst({
      where: {
        title,
        imageUrl,
        releaseDate: parseInt(releaseDate),
        rating: parseFloat(rating),
        overview,
        users: {
          some: {
            id: userid,
          },
        },
      },
    });

    if (existingMovie) {
      res.status(400).send({ message: "Movie is already added to favorites" });
      return;
    }

    const addedMovie = await db.movie.create({
      data: {
        title,
        imageUrl,
        releaseDate: parseInt(releaseDate),
        rating: parseFloat(rating),
        overview,
        users: {
          connect: {
            id: userid,
          },
        },
      },
    });

    res.status(200).send({ message: "Movie added to favorites", id: addedMovie.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error while adding movie to favorites" });
  }
});

app.get("/api/favorite", authMiddleware, async (req, res) => {
  try {
    const userid = req.user;
    const page = parseInt(req.query.page) || 0;
    const query = req.query.query || "";
    const sort = req.query.sort || "releaseDate";
    const order = req.query.order === "desc" ? "desc" : "asc";

    const limit = 8;
    const offset = page * limit;

    const favoriteMovies = await db.movie.findMany({
      where: {
        users: {
          some: {
            id: userid,
          },
        },
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: {
        [sort]: order,
      },
      skip: offset,
      take: limit,
    });

    const totalCount = await db.movie.count({
      where: {
        users: {
          some: {
            id: userid,
          },
        },
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).send({ movies: favoriteMovies, currentPage: page, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error while fetching favorite movies" });
  }
});

app.delete("/api/favorite/:id", authMiddleware, async (req, res) => {
  try {
    const userid = req.user;
    const movieId = parseInt(req.params.id);

    await db.movie.update({
      where: { id: movieId },
      data: {
        users: {
          disconnect: {
            id: userid,
          },
        },
      },
    });

    const remainingUsers = await db.user.findMany({
      where: {
        favorites: {
          some: {
            id: movieId,
          },
        },
      },
    });

    if (remainingUsers.length === 0) {
      await db.movie.delete({
        where: { id: movieId },
      });
    }

    res.status(200).send({ message: "Movie removed from favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error while removing movie from favorites" });
  }
});

app.put("/api/favorite/:id", authMiddleware, async (req, res) => {
  try {
    const userid = req.user;
    const movieId = parseInt(req.params.id);
    const { title, imageUrl, releaseDate, rating, overview } = req.body;
    const ratingint = parseFloat(rating);
    // Check if the movie exists and is connected to the connected user
    const existingMovie = await db.movie.findFirst({
      where: {
        id: movieId,
        users: {
          some: {
            id: userid,
          },
        },
      },
    });

    if (!existingMovie) {
      res.status(404).send({ message: "Movie not found or not connected to the user" });
      return;
    }

    const updatedMovie = await db.movie.update({
      where: { id: movieId },
      data: { title, imageUrl, releaseDate: parseInt(releaseDate), rating: ratingint, overview },
    });

    res.status(200).send(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error while updating movie in the database" });
  }
});

app.post("/api/search-movies", authMiddleware, async (req, res) => {
  const { searchTerm } = req.body;

  if (!searchTerm) {
    return res.status(400).send("Please enter a search term.");
  }

  const options = {
    method: "GET",
    url: "https://online-movie-database.p.rapidapi.com/title/v2/find",
    params: {
      title: searchTerm,
      limit: "8",
      sortArg: "moviemeter,asc",
    },
    headers: {
      "X-RapidAPI-Key": process.env.OMDB_API_KEY,
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).send(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while searching for movies");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
