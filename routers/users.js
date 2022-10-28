const userRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  validationForChangeUser,
  validationForCreateUser,
  validationForLogin,
} = require('../validation/validation');

const {
  createUser,
  getUserData,
  login,
  logout,
  changeUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

userRouter.get('/users/me', auth, getUserData);
userRouter.patch('/users/me', auth, celebrate(validationForChangeUser), changeUser);

// регистрация, авторизация, выход
userRouter.post('/signup', celebrate(validationForCreateUser), createUser);
userRouter.post('/signin', celebrate(validationForLogin), login);
userRouter.get('/signout', auth, logout);

module.exports = userRouter;
