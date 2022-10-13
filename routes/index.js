const router = require('express').Router()
const usersRoutes = require('./usersRoutes')

router.get('/', (req,res)=>{
  res.send('GET REQUEST')
})

router.post('/', (req, res)=>{
  res.send(req.body)
})

router.use('/users', usersRoutes)

module.exports = router