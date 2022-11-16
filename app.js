// Пути к модулям.
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
// Пути к файлам.
const { NODE_MODE, DB_ADRES } = process.env;
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const userRouter = require('./routers/users');
const movieRouter = require('./routers/movies');
const errorHandler = require('./middlewares/errorHandler');
const { limiter } = require('./middlewares/limiter');
const NotFound404 = require('./errors/NotFound404');

const app = express();
const { PORT = 3000 } = process.env;
app.use(cors({
  origin: ['http://localhost:3001'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use('/', userRouter);
app.use('/', movieRouter);
app.use('/*', auth, (req, res, next) => {
  next(new NotFound404('ошибка 404, страницы не существует'));
});

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);
app.use(limiter);
// console.log(NODE_MODE !== 'production' ? 'mongodb://localhost:27017/moviesdb' : DB_ADRES);

async function main() {
  // mongoose.connect('mongodb://localhost:27017/moviesdb', {
  mongoose.connect(NODE_MODE !== 'production' ? 'mongodb://localhost:27017/moviesdb' : DB_ADRES, { useNewUrlParser: true });
  app.listen(PORT, () => {
    console.log(`Server start port:${PORT}. ОК`);
  });
}
main();
