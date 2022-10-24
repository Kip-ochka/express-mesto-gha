const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const cardsRoutes = require('./cardsRoutes');
const { login, createUser } = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signin', login);
router.post('/signup', createUser);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
module.exports = router;
