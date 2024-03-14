const mongoose = require("mongoose");

const { Schema } = mongoose;

const verificationTokenSchema = new mongoose.Schema({
  _id: { type: String, default: mongoose.Types.ObjectId },
  identifier: { type: String },
  token: { type: String, unique: true },
  expires: { type: Date },
});

verificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

const VerificationToken = mongoose.model(
  "VerificationToken",
  verificationTokenSchema
);

module.exports = VerificationToken;
