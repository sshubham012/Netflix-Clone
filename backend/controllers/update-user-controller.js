const { StatusCodes } = require("http-status-codes"); // Import StatusCodes from appropriate library
const User = require("../models/user_model");
const addFavMovie = async (req, res) => {
  const userId = req.body.userId;
  const movieId = req.body.movieId;

  if (!userId || !movieId) {
    return res.status(400).json({ msg: "Invalid input data" });
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $push: { favoriteIds: movieId },
    },
    { new: true }
  );

  if (!user) {
    
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "User not found" });
  }
  return res.status(StatusCodes.OK).json(user);
};

module.exports = { addFavMovie };
