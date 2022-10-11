const mongoose = require('mongoose');
const { isURL } = require('validator');
const userSchema = require('./user');

const movieScheme = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(data) {
        return isURL(data);
      },
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(data) {
        return isURL(data);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(data) {
        return isURL(data);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: userSchema,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieScheme);
