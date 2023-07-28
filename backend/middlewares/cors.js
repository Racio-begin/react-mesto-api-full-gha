// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://api.giga-mesto.nomoredomains.xyz',
  'http://giga-mesto.nomoredomains.xyz',
  'https://api.giga-mesto.nomoredomains.xyz',
  'https://giga-mesto.nomoredomains.xyz',
  'http://localhost:3000',
  'http://localhost:3004',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const { method } = req;

  // Сохраняем источник запроса в переменную origin,
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // res.sendStatus(200);

    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};

module.exports = {
  cors,
};
