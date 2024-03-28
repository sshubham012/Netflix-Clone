const User = require("../models/user_model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcrypt");
const { response } = require("express");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

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

const githubAccessToken = async (req, res) => {
  console.log("GitHub authorization code:", req.query.code);

  const params =
    "?client_id=" +
    process.env.CLIENT_ID +
    "&client_secret=" +
    process.env.CLIENT_SECRET +
    "&code=" +
    req.query.code;

  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token" + params,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("GitHub access token response:", data);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.error("Error fetching GitHub access token:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getgitdata = async (req, res) => {
  const token = req.query.code;
  const url = "https://api.github.com/octocat";
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  console.log(1);
  const response = await fetch(url, { method: "GET", headers });
  console.log(1);

  console.log(1);

  console.log(response);
  const data = await response.json();
  return data;
};

module.exports = { register, login, githubAccessToken, getgitdata };
