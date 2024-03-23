const User = require("../models/user_model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    name: req.body.name,
    email: req.body.email,
    hashedPassword,
  };
  const user = await User.create({ ...userData });
  res.status(StatusCodes.OK).json(user);
};


const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    throw new BadRequestError("Please provide email and password");
  }

  const { email, password } = req.body; 

  const user = await User.findOne({ email });

  if (!user) throw new UnauthenticatedError("Invalid credentials");

  const validPassword = bcrypt.compare(password, user.hashedPassword);

  if (!validPassword) throw new UnauthenticatedError("Invalid credentials");

  const token = user.generateJWT();

  res.status(StatusCodes.OK).header("token", token).json(user);
};

module.exports = { register, login };
