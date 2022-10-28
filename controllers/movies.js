const Movie = require('../models/movie');

const Forbidden403 = require('../errors/Forbidden403');
const NotFound404 = require('../errors/NotFound404');
// const ServerError500 = require('../errors/ServerError500');
const BadRequest400 = require('../errors/BadRequest400');
// const Unauthorized401 = require('../errors/Unauthorized401');
// const Http409Conflicting = require('../errors/BadRequest400');

const createMovie = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movie = await Movie.create({
      ...req.body,
      owner,
    });
    res.status(201).send(movie);
  } catch (err) {
    if (err) {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest400(
            `Переданы некорректные данные при добавлении фильма.
            Все поля необходимо заполнить.
            Поля: "image", "trailerLink", "thumbnail" должны быть ссылками.`,
          ),
        );
        return;
      }
      next(err);
    }
  }
};

const getMovies = async (req, res, next) => {
  const ownerId = req.user._id;
  try {
    const movie = await Movie.find({ owner: ownerId });
    res.send(movie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  const id = req.user._id;
  const movieId = req.params._id;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      next(new NotFound404(`Фильм с указанным _id:${movieId} не найден`));
      return;
    }
    if (id !== String(movie.owner)) {
      next(new Forbidden403('Вы не можите удалять чужой фильм'));
      return;
    }
    const delMovie = await Movie.findByIdAndRemove(movieId);
    res.send(delMovie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest400('Переданны некорректные данные'));
      return;
    }
    next(err);
  }
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
