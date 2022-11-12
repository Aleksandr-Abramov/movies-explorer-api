const { Joi } = require('celebrate');

const regex = /https?:\/\/(w{3})?[a-z0-9-]+\.[a-z0-9\S]{2,}/;

const validationForChangeUser = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
};

const validationForCreateUser = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};
const validationForLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};
const validationForDeleteMovie = {
  params: Joi.object().keys({
    _id: Joi.string().hex(),
  }),
};

const validationForCreateMovie = {
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
    movieId: Joi.number().required(),
  }),
};

module.exports = {
  validationForChangeUser,
  validationForCreateUser,
  validationForLogin,
  validationForCreateMovie,
  validationForDeleteMovie,
};
