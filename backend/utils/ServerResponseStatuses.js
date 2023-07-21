/* *** Статусы успешного запроса *** */

// Запрос успешно прошёл (ОК)
const OK_STATUS = 200;

// Ресурс был успешно создан на сервере
const CREATED_STATUS = 201;

/* *** Статусы ошибок *** */

// Невалидный запрос
const BAD_REQUEST_ERROR = 400;

// Ошибка авторизации
const UNAUTHORIZED_ERROR = 401;

// Доступ к запрашиваемому ресурсу запрещен
const FORBIDDEN_ERROR = 403;

// Страница/сущность не найдена
const NOT_FOUND_ERROR = 404;

// Конфликт запроса с текущим состоянием сервера
const CONFLICT_ERROR = 409;

// Общий статус для ошибок на стороне сервера
const INTERNAL_SERVER_ERROR = 500;

// Ошибка MongoDB при попытке создать дубликат уникального
const MONGO_DUPLICATE_KEY_ERROR = 11000;

module.exports = {
  OK_STATUS,
  CREATED_STATUS,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
  MONGO_DUPLICATE_KEY_ERROR,
};
