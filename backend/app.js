// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const cors = require('cors');

const routes = require('./routes/users');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { INTERNAL_SERVER_ERROR } = require('./utils/ServerResponseStatuses');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://giga-mesto.nomoredomains.xyz',
    'https://api.giga-mesto.nomoredomains.xyz',
  ],
  credentials: true,
}));

// защитить приложение от веб-уязвимостей
app.use(helmet());

// подключаемся к базе данных
mongoose.connect(DB_URL);

// применить для всех роутов встроенный в express пасчер (чтение тела запроса)
app.use(express.json());

// подключаем логгер запросов
app.use(requestLogger);

// подключаем все роуты
app.use(routes);

// подключаем логгер ошибок
app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR } = err;
  res.status(statusCode).send({ message: statusCode === INTERNAL_SERVER_ERROR ? 'Стандартная ошибка' : err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}! :)`);
});
