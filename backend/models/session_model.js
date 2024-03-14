const mongoose = require("mongoose");

const { Schema } = mongoose;

const sessionSchema = new mongoose.Schema({
  _id: { type: String, default: mongoose.Types.ObjectId },
  sessionToken: { type: String, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  expires: { type: Date },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
