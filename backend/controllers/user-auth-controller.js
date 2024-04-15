const User = require("../models/user_model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcrypt");

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
  const params = `?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`;

  const tokenResponse = await fetch(
    `https://github.com/login/oauth/access_token${params}`,
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

  const tokenData = await tokenResponse.json();
  const { access_token } = tokenData;
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
  const fullUserData = await userDataResponse.json();
  const userEmail = fullUserData.email || "";

  let user = await User.findOne({ email: userEmail });
  if (!user) {
    const userDataToSave = {
      email: userEmail,
      name: fullUserData.login,
      image: fullUserData.avatar_url,
    };
    user = await User.create(userDataToSave);
  }
  console.log(fullUserData);
  console.log(user);

  res.status(StatusCodes.OK).json({ userData: user, access_token });
};

module.exports = { register, login, githubAccessToken };
