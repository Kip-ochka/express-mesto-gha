const {getUsers, getUser, createUser} = require("../controllers/user");
const usersRoutes = require('express').Router()

usersRoutes.get('/', getUsers)
usersRoutes.get('/:userId', getUser)
usersRoutes.post('/', createUser)

module.exports = usersRoutes