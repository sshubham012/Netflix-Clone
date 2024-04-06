const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  videoUrl: { type: String },
  thumbnailUrl: { type: String },
  genre: { type: String },
  duration: { type: String },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
