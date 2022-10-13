const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const cardsRoutes = require('./cardsRoutes');

router.get('/', (req, res) => {
  res.send('GET REQUEST');
});

router.post('/', (req, res) => {
  res.send(req.body);
});

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
module.exports = router;
