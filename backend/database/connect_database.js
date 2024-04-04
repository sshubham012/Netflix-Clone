const mongoose = require("mongoose");

const connect_database = (url) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect_database;
