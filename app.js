const express = require('express');
const mestodb = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/index');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
mestodb.connect(MONGO_URL);
app.listen(PORT);
app.use(express.json());
app.use((req, res, next) => {
  req.user = { _id: '634841cef29454be6f630012' };
  next();
});
app.use(routes);
