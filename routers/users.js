const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createUser,
  getUserData,
  login,
  logout,
  changeUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

userRouter.get('/users/me', auth, getUserData);
userRouter.patch('/users/me', auth, changeUser);

// регистрация, авторизация, выход
userRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
userRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
userRouter.post('/signout', auth, logout);

module.exports = userRouter;
