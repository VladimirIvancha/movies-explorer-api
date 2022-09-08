require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const router = require('./routes');
const handleErrors = require('./errors/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  NODE_ENV,
  MONGODB_ADDRESS,
} = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());

const allowedCors = [
  'https://m.explorer.nomoredomains.sbs',
  'http://m.explorer.nomoredomains.sbs',
  'http://localhost:3000',
];

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);
app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

mongoose.connect((NODE_ENV === 'production' ? MONGODB_ADDRESS : 'mongodb://localhost:27017/bitfilmsdb'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
