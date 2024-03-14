const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: String, default: mongoose.Types.ObjectId },
  name: { type: String, required: true },
  image: { type: String },
  email: { type: String, unique: true },
  emailVerified: { type: Date },
  hashedPassword: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
  accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
  favoriteIds: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model("user", userSchema);
