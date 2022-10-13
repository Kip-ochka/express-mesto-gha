const usersRoutes = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/user');

usersRoutes.get('/', getUsers);
usersRoutes.get('/:userId', getUser);
usersRoutes.post('/', createUser);
usersRoutes.patch('/me', updateUserInfo);
usersRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = usersRoutes;
