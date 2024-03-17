const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  email: { type: String, unique: true },
  emailVerified: { type: Date},
  hashedPassword: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
  favoriteIds: [{ type: mongoose.Schema.Types.ObjectId }],
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userID: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.hashedPassword);
};

module.exports = mongoose.model("user", UserSchema);
