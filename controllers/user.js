const User = require('../models/user');
const { DEFAULT_ERROR_CODE, NOT_FOUND_ERROR_CODE, INCORRECT_DATA_ERROR_CODE } = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла обика' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('Not Found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'Not Found') {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Пользователь с указанным _id не найден' });
      }
      if (err.name === 'CastError') {
        return res
          .status(INCORRECT_DATA_ERROR_CODE)
          .send({ message: 'Не корректный _id пользователя' });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Ошибка валидации' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла обика' });
    });
};

const updateData = (req, res, userData) => {
  User.findByIdAndUpdate(req.user._id, userData, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(INCORRECT_DATA_ERROR_CODE)
          .send({ message: 'Отправленные данные некорректный, перепроверьте данные.' });
      }
      if (err.name === 'Cast.Error') {
        return res
          .status(INCORRECT_DATA_ERROR_CODE)
          .send({ message: 'Не корректный _id пользователя' });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const userData = {
    name: req.body.name,
    about: req.body.about,
  };
  updateData(req, res, userData);
};

module.exports.updateUserAvatar = (req, res) => {
  const userData = {
    avatar: req.body.avatar,
  };
  updateData(req, res, userData);
};
