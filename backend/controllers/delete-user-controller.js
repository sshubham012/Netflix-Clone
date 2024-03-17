const User = require("../models/user_model");
const { StatusCodes } = require("http-status-codes");

const deleteOneUser = async (req, res) => {
  const userId = req.params.id;
  const deletedUser = await User.deletebyId(userId);
  res.status(StatusCodes.ACCEPTED).json(deletedUser);
};

const deleteAllUsers = async (req, res) => {
  const deletedUser = await User.deleteMany();
  res.status(StatusCodes.ACCEPTED).json({msg: "Deleting all users"});
};

module.exports = {
  deleteAllUsers,
  deleteOneUser,
};
