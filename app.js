// Пути к модулям.
const express = require('express');
const mongoose = require('mongoose');
// Пути к файлам.
const userRouter = require('./routers/users');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

app.use('/', userRouter);

async function main() {
  mongoose.connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
  });
  app.listen(PORT, () => {
    console.log(`Server start port:${PORT}. ОК`);
  });
}
main();
