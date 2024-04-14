const {
  register,
  login,
  githubAccessToken,
} = require("./user-auth-controller");
const { getAllUsers, getUser } = require("./fetch-user-controller");
const { deleteOneUser, deleteAllUsers } = require("./delete-user-controller");
const { addFavMovie } = require("./update-user-controller");
module.exports = {
  register,
  getAllUsers,
  getUser,
  deleteOneUser,
  deleteAllUsers,
  login,
  githubAccessToken,
  addFavMovie,
};
