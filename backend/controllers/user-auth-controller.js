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
  // Construct URL parameters for GitHub access token request
  const params =
    "?client_id=" +
    process.env.CLIENT_ID +
    "&client_secret=" +
    process.env.CLIENT_SECRET +
    "&code=" +
    req.query.code;

  // Request GitHub access token
  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token" + params,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!tokenResponse.ok) {
    throw new Error(
      `Failed to obtain access token. Status: ${tokenResponse.status}`
    );
  }

  // Parse access token from response
  const tokenData = await tokenResponse.json();
  const { access_token } = tokenData;

  // Request GitHub user data using the access token
  const userDataResponse = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!userDataResponse.ok) {
    throw new Error(
      `Failed to fetch GitHub user data. Status: ${userDataResponse.status}`
    );
  }

  // Parse user data from response
  const fullUserData = await userDataResponse.json();
  const useremail =  fullUserData.email || "";
  // Save user data to database
  const userDataToSave = {
    email:"",
    name: fullUserData.login,
    image: fullUserData.avatar_url,
  };
  const user = await User.create(userDataToSave);

  // Send GitHub user data and access token back in the response
  res.status(StatusCodes.OK).json({ userData: fullUserData, access_token });
};

module.exports = { register, login, githubAccessToken };
