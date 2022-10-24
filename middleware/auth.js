const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

module.exports = (req, _, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new Unauthorized('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }
  req.user = payload;
  return next();
};
