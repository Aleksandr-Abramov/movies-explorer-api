const userRouter = require('express').Router();

const {
  createUser,
  getUserData,
  login,
  logout,
  changeUser,
} = require('../controllers/users');
const auth = require('../middleware/auth');

userRouter.get('/users/me', auth, getUserData);
userRouter.put('/users/me', auth, changeUser);

// регистрация, авторизация, выход
userRouter.post('/signup', createUser);
userRouter.post('/signin', login);
userRouter.post('/signout', auth, logout);

module.exports = userRouter;
