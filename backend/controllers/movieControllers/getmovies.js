const { StatusCodes } = require("http-status-codes"); // Import StatusCodes from appropriate library
const Movies = require("../../models/movies_model"); // Import the Movies model
const getRandMovie = async (req, res) => {
  const randMovie = await Movies.aggregate([{ $sample: { size: 1 } }]);
  res.status(StatusCodes.OK).json(randMovie[0]);
};
const getAllMovies = async (req, res) => {
  const movieData = await Movies.find({});
  res.status(StatusCodes.OK).json(movieData);
};


module.exports = { getAllMovies, getRandMovie };
