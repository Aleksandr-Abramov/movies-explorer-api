const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// const Created201 = require('../errors/Created201');
// const Forbidden403 = require('../errors/Forbidden403');
const NotFound404 = require('../errors/NotFound404');
// const ServerError500 = require('../errors/ServerError500');
const Unauthorized401 = require('../errors/Unauthorized401');
const BadRequest400 = require('../errors/BadRequest400');
const Http409Conflicting = require('../errors/Http409Conflicting');

const { JWT_SECRET, NODE_MODE } = process.env;

const getUserData = async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      next(new NotFound404(`Пользователь по указанному _id ${id} не найден.`));
      return;
    }
    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    if (err.kind === 'ObjectId') {
      next(new BadRequest400('данные не корректны'));
      return;
    }
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    res
      .status(201)
      .send({
        name: user.name,
        email: user.email,
      });
  } catch (err) {
    if (err.code === 11000) {
      next(new Http409Conflicting('Пользователь с таким email существует'));
      return;
    }
    if (err.name === 'ValidationError') {
      next(new BadRequest400('Не удалось создать пользователя, данные не корректны'));
      return;
    }
    next(err);
  }
};

const changeUser = async (req, res, next) => {
  const id = req.user._id;
  const userData = req.body;
  try {
    const user = await User.findOne({ email: userData.email });
    if (user) {
      next(new Http409Conflicting('переднный email уже есть в базе. Придумайте другой email.'));
      return;
    }
    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      { name: userData.name, email: userData.email },
      { new: true, runValidators: true, upsert: true },
    );
    res.status(201).send(updateUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest400('Переданы некорректные данные при обновлении профиля.'));
      return;
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new Unauthorized401('Неправильные почта или пароль'));
      return;
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      next(new Unauthorized401('Неправильные почта или пароль'));
      return;
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_MODE !== 'production' ? 'SECRET' : JWT_SECRET,
      { expiresIn: 3600 },
    );
    res.cookie('token', token, {
      maxAge: 3600000,
      sameSite: 'None',
      secure: true,
      httpOnly: true,
      // sameSite: false,
    });
    res.send({ cookie: token }).end();
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.send({ message: 'Выход, куки удалины' });
};

const getCookies = async (req, res, next) => {
  const { token } = req.cookies;
  const cookies = req.body;
  try {
    if (cookies.token === '') {
      res.send({ access: false });
      return;
    }
    if (cookies.token !== token) {
      res.send({ access: false });
      return;
    }
    res.send({ access: true });
    return;
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserData,
  createUser,
  login,
  logout,
  changeUser,
  getCookies,
};
