const mongoose = require("mongoose");

const { Schema } = mongoose;

const accountSchema = new mongoose.Schema({
  _id: { type: String, default: mongoose.Types.ObjectId },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  type: { type: String },
  provider: { type: String },
  providerAccountId: { type: String },
  refresh_token: { type: String },
  access_token: { type: String },
  expires_at: { type: Number },
  token_type: { type: String },
  scope: { type: String },
  id_token: { type: String },
  session_state: { type: String },
});

accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
