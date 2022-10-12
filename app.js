const express = require('express')
const mestodb = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express()

mestodb.connect('mongodb://localhost:27017/mestodb ')

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})