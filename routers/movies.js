const movieRouter = require('express').Router();
const { createMovie, getMovies } = require('../controllers/movies');
const auth = require('../middleware/auth');

movieRouter.post('/movies', auth, createMovie);
movieRouter.get('/movies', auth, getMovies);

module.exports = movieRouter;
