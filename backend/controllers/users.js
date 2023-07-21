// Подключим модуль для хэширования пароля
const bcrypt = require('bcryptjs');

// Подключим модуль для создания и проверки токенов
const jwt = require('jsonwebtoken');

// Импортировать модель пользователя
const User = require('../models/user');

const SECRET_KEY = require('../utils/sk');

// Импортировать статусы ответов сервера
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

const { OK_STATUS, CREATED_STATUS, MONGO_DUPLICATE_KEY_ERROR } = require('../utils/ServerResponseStatuses');

const SALT_ROUNDS = 10;

// РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ //
const createUser = (req, res, next) => {
  // Получим из объекта запроса имя, описание и аватар пользователя
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  // Вызвать метод create, передаем данные на вход для создания пользователя,
  // создадим документ на основе пришедших данных
  bcrypt.hash(
    password,
    SALT_ROUNDS,
  )
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    // в случае успеха (resolve) приходит новая запись с новым пользователем, отправляем её на фронт
    .then((user) => {
      res.status(CREATED_STATUS).send(user);
    })
    // в случае провала (req) приходит ошибка и отпраляется на фронт для обозначения проблемы
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      }
      if (err.code === MONGO_DUPLICATE_KEY_ERROR) {
        return next(new ConflictError('Пользователь с указанным Email уже зарегистрирован.'));
      }
      return next(err);
    });
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

// todo: реализовать orFail() для реализации всех ошибок в .catch
const getUser = (req, res, next) => {
  // Вызвать метод findById, возвращает пользователя по id, если он есть
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else res.status(OK_STATUS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при запросе пользователя.'));
      }
      return next(err);
    });
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Такого пользователя не существует.'));
      }
      res.send({ data: user });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  // Вызвать метод findByIdAndUpdate, ищет пользователя по id и обновляет указанные поля
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, {
    // обработчик then получит на вход обновлённую запись
    new: true,
    // данные будут валидированы перед изменением
    runValidators: true,
  })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, {
    // обработчик then получит на вход обновлённую запись
    new: true,
    // данные будут валидированы перед изменением
    runValidators: true,
  })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
      }
      return next(err);
    });
};

// АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ //
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.send({ token });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateAvatar,
  login,
};
