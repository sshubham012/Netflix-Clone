const register = require("./create-user-controller");
const { getAllUsers, getUser } = require("./fetch-user-controller");
const { deleteOneUser, deleteAllUsers } = require("./delete-user-controller");
module.exports = {
  register,
  getAllUsers,
  getUser,
  deleteOneUser,
  deleteAllUsers
};
