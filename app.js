const express = require('express');
const mestodb = require('mongoose');

const routes = require('./routes/index');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

mestodb.connect(MONGO_URL);

app.listen(PORT);

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: '634841cef29454be6f630012' };
  next();
});

app.use(routes);
