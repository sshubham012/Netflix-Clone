require('dotenv').config();
const mockData = require('./dummy/movies.json');
const Movie = require('./models/movies_model');
const connectDB = require('./database/connect_database');

const start = async () => {
  try {
    await connectDB("mongodb://127.0.0.1:27017/netflix_db");
    await Movie.create(mockData);
    console.log('Success !!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
