// Пути к модулям.
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
// Пути к файлам.
const userRouter = require('./routers/users');
const movieRouter = require('./routers/movies');
const errorHendler = require('./errors/errorHendler');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(cookieParser());

app.use('/', userRouter);
app.use('/', movieRouter);

app.use(errorHendler);

async function main() {
  mongoose.connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
  });
  app.listen(PORT, () => {
    console.log(`Server start port:${PORT}. ОК`);
  });
}
main();
