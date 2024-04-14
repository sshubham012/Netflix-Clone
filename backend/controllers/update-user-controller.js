const { StatusCodes } = require("http-status-codes"); // Import StatusCodes from appropriate library
const User = require("../models/user_model");
const addFavMovie = async (req, res) => {
  const userId = req.body.userId;
  const favoriteId = req.body.favMovieId;
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { favoriteIds: favoriteId },
    },
    { new: true }
  );

  if (!user) {
    console.log("User not found");
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "User od Movie not found" });
  }

  console.log("Updated user:", user);
  res.status(StatusCodes.OK).json(user);
};

module.exports = { addFavMovie };
