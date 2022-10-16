const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const cardsRoutes = require('./cardsRoutes');

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
module.exports = router;
