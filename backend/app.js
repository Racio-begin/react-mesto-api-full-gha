const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const cookieParser = require('cookie-parser');

// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-unresolved
const cors = require('cors');
const NotFoundError = require('./errors/NotFoundError');

const auth = require('./middlewares/auth');
// const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUserJoiValidation, loginJoiValidation } = require('./middlewares/JoiValidator');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { createUser, login } = require('./controllers/users');

const { PORT } = require('./utils/env');
const { INTERNAL_SERVER_ERROR } = require('./utils/ServerResponseStatuses');

const app = express();

// защитить приложение от веб-уязвимостей
app.use(helmet());

// app.use(cors);
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3004',
    'https://giga-mesto.nomoredomains.xyz',
    'http://giga-mesto.nomoredomains.xyz',
  ],
  credentials: true,
}));

// app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// применить для всех роутов встроенный в express пасчер (чтение тела запроса)
app.use(express.json());

// подключаем логгер запросов
app.use(requestLogger);

app.post('/signin', loginJoiValidation, login);
app.post('/signup', createUserJoiValidation, createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте правильность введенного URL.'));
});

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
