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
  getCookies,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

userRouter.post('/getcookies', getCookies);
userRouter.get('/users/me', auth, getUserData);
userRouter.patch('/users/me', auth, celebrate(validationForChangeUser), changeUser);

// регистрация, авторизация, выход
userRouter.post('/signup', celebrate(validationForCreateUser), createUser);
userRouter.post('/signin', celebrate(validationForLogin), login);
userRouter.get('/signout', logout);

module.exports = userRouter;
