const express = require("express");
const {
  getRandMovie,
  getAllMovies,
  getMovieDb,
} = require("../controllers/movieControllers/getmovies");
const router = express.Router();

router.get("/getRandMovie", getRandMovie);
router.get("/getall", getAllMovies);

module.exports = router;
