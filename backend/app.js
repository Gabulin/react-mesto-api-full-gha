const { errors } = require('celebrate');
const { config } = require('dotenv');
const express = require('express');
const { rateLimit } = require('express-rate-limit');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const errorMiddleware = require('./middlewares/errors');
const routes = require('./routes/routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

config();

const { 
  PORT = 3000,
  MONGO = 'mongodb://127.0.0.1:27017/mestodb'
} = process.env;

const limit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

mongoose.connect(MONGO);

const app = express();

app.use(cors({ origin: [
  'https://gabulib.frontend.nomoredomains.xyz',
  'http://localhost:3001'
] }));
app.use(express.json());
app.use(limit);
app.use(requestLogger);
app.use(helmet());
app.use(cookieParser());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server listen: ${PORT}`));
