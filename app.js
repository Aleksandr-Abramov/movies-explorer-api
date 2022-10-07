// Пути к модулям.
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
// Пути к файлам.
const { NODE_MODE, DB_ADRES } = process.env;
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const userRouter = require('./routers/users');
const movieRouter = require('./routers/movies');
const errorHendler = require('./middlewares/errorHendler');

const app = express();
const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use('/', userRouter);
app.use('/', movieRouter);

app.use(errors());
app.use(errorLogger);
app.use(errorHendler);

async function main() {
  // mongoose.connect('mongodb://localhost:27017/moviesdb', {
  mongoose.connect(
    NODE_MODE === 'production'
      ? DB_ADRES
      : 'mongodb://localhost:27017/moviesdb',
    {
      useNewUrlParser: true,
    },
  );
  app.listen(PORT, () => {
    console.log(`Server start port:${PORT}. ОК`);
  });
}
main();
