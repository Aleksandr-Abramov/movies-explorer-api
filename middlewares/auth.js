const { JWT_SECRET, NODE_MODE } = process.env;
const jwt = require('jsonwebtoken');
const Unauthorized401 = require('../errors/Unauthorized401');
// const ServerError500 = require('../errors/ServerError500');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Unauthorized401('Необходима авторизация11'));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_MODE !== 'production' ? 'SECRET' : JWT_SECRET);
    // console.log(token);
    // console.log(payload);
  } catch (err) {
    return next(new Unauthorized401('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
