const express = require('express')
const mestodb = require('mongoose');
const routes = require('./routes/index')
const { PORT = 3000, MONGO_URL='mongodb://localhost:27017/mestodb' } = process.env;
const app = express()

mestodb.connect(MONGO_URL)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

app.use(express.json())

app.use(routes)
