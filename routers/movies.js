const movieRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

const {
  validationForCreateMovie,
  validationForDeleteMovie,
} = require('../validation/validation');
const auth = require('../middlewares/auth');

movieRouter.post('/movies', auth, celebrate(validationForCreateMovie), createMovie);
movieRouter.get('/movies', auth, getMovies);
movieRouter.delete('/movies/:_id', auth, celebrate(validationForDeleteMovie), deleteMovie);

module.exports = movieRouter;
