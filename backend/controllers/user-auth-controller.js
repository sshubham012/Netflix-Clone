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
  res.status(StatusCodes.CREATED).json(user);
};
const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    throw new BadRequestError("Please provide email and password");
  }

  const { email, password } = req.body; // Destructure email and password from req.body

  const user = await User.findOne({ email });

  if (!user) throw new UnauthenticatedError("Invalid credentials");

  const validPassword = await bcrypt.compare(password, user.hashedPassword); // Await bcrypt.compare()

  if (!validPassword) throw new UnauthenticatedError("Invalid credentials");

  // generateJWT is a method of your User model that generates a JWT token

  const token = user.generateJWT();

  res.status(StatusCodes.OK).header("token", token).json(user);
};

module.exports = { register, login };
