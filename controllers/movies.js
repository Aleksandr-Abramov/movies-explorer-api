const Movie = require('../models/movie');
// const Created201 = require('../errors/Created201');
// const Forbidden403 = require('../errors/Forbidden403');
// const NotFound404 = require('../errors/NotFound404');
const ServerError500 = require('../errors/ServerError500');
// const Unauthorized401 = require('../errors/Unauthorized401');
const BadRequest400 = require('../errors/BadRequest400');
// const Http409Conflicting = require('../errors/BadRequest400');

const createMovie = async (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    // movieId,
  } = req.body;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      owner,
      // movieId,
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
      next(new ServerError500('произошла ошибка на сервере'));
    }
  }
};

const getMovies = async (req, res, next) => {
  const ownerId = req.user._id;
  try {
    const movie = await Movie.find({ owner: ownerId });
    res.send(movie);
  } catch (err) {
    next(new ServerError500('произошла ошибка на сервере'));
  }
};

module.exports = {
  createMovie,
  getMovies,
};
