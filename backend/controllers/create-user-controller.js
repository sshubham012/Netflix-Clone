const User = require("../models/user_model");
const { StatusCodes } = require("http-status-codes");

const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    name: req.body.name,
    email: req.body.email,
    hashedPassword,
  };
  const user = await User.create({ ...userData });
  res.status(StatusCodes.CREATED).json(user);
};

module.exports = register;
