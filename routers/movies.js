const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');

const regex = /https?:\/\/(w{3})?[a-z0-9-]+\.[a-z0-9\S]{2,}/;

movieRouter.post('/movies', auth, celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regex).required(),
    trailer: Joi.string().pattern(regex).required(),
    thumbnail: Joi.string().pattern(regex).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.string().required(),
  }),
}), createMovie);
movieRouter.get('/movies', auth, getMovies);
movieRouter.delete('/movies/:_id', auth, celebrate({
  params: Joi.object().keys({
    _id: Joi.string().min(24).max(24),
  }),
}), deleteMovie);

module.exports = movieRouter;
