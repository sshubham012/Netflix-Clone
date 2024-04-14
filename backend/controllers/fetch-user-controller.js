const Users = require("../models/user_model");
const { StatusCodes } = require("http-status-codes");
const getAllUsers = async (req, res) => {
  const allUsers = await Users.find();
  res.status(StatusCodes.OK).json(allUsers);
};

const getUser = async (req, res) => {
  const userID = req.params.id;
  const user = await Users.findById(userID).catch((err) => console.log(err));
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send("The specified User could not be found");
  }
  res.status(StatusCodes.OK).json(user);
};

module.exports = { getAllUsers, getUser };
