const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => res.status(500).send({ message: 'На сервере произошла обика', err }));
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
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден' });
      }
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Не корректный _id пользователя' });
      }
      return res
        .status(500)
        .send({ message: 'На сервере произошла ошибка' }, err);
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
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Ошибка валидации',
          err,
        });
      }
      return res.status(500).send({
        message: 'На сервере произошла обика',
        err,
      });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const userData = {
    name: req.body.name,
    about: req.body.about,
  };
  User.findByIdAndUpdate(req.user._id, userData, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error('Not Found'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'Not Found') {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден' });
      }
      if (err.name === 'Cast.Error') {
        return res
          .status(400)
          .send({ message: 'Не корректный _id пользователя' });
      }
      return res
        .status(500)
        .send({ message: 'На сервере произошла ошибка' }, err);
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const userData = {
    avatar: req.body.avatar,
  };
  User.findByIdAndUpdate(req.user._id, userData, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error('Not Found'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'Not Found') {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден' });
      }
      if (err.name === 'Cast.Error') {
        return res
          .status(400)
          .send({ message: 'Не корректный _id пользователя' });
      }
      return res
        .status(500)
        .send({ message: 'На сервере произошла ошибка' }, err);
    });
};
