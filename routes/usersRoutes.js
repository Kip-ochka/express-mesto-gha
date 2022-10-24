const usersRoutes = require('express').Router();

const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getMyData,
} = require('../controllers/user');

usersRoutes.get('/', getUsers);
usersRoutes.get('/:userId', getUser);
usersRoutes.get('/me', getMyData);
usersRoutes.patch('/me', updateUserInfo);
usersRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = usersRoutes;
