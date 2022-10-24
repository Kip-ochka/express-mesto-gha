const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const cardsRoutes = require('./cardsRoutes');
const { login, createUser } = require('../controllers/user');
const auth = require('../middleware/auth');
const { validateLoginData, validateRegisterData } = require('../utils/validators/userValidator');

router.post('/signin', validateLoginData, login);
router.post('/signup', validateRegisterData, createUser);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
module.exports = router;
