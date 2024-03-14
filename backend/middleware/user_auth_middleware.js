const User = require("../models/user_model");
const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors");

const checkAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwr.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Failed" + error);
  }
};
module.exports = checkAuthentication;
