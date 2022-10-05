const userRouter = require('express').Router();
const { createUser, getUsers } = require('../controllers/users');

userRouter.get('/users/me', getUsers);

userRouter.post('/signup', createUser);

module.exports = userRouter;
